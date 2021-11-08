import { findIntersections } from "./utils";

class Rel {
    constructor({ from, to, ctx, spreadIndex, numberOfSharedRels, properties = {}, style = {} }) {
        this.to = to;
        this.from = from;
        this.ctx = ctx;
        this.numberOfSharedRels = numberOfSharedRels;
        this.spreadIndex = spreadIndex - 1;
        this.MAX_SHARED_RELS = 12;
        const color = style.color || "rgba(0, 80, 0, .8)";
        const strokeWidth = style.strokeWidth || 2;
        this.arrowSize = { height: strokeWidth * 5, width: strokeWidth * 2 };
        this.style = { color, strokeWidth, fontSize: 16 };
        this.cache = { curved: null, straight: null };
        this.properties = properties;
        this.padding = this.arrowSize.height;
    }
    draw(filterNode) {
        if (filterNode && ![this.from.id, this.to.id].includes(filterNode.id)) {
            this.drawFromCache();
            return;
        }
        if (this.spreadIndex < 1 && Math.min(this.numberOfSharedRels(), this.MAX_SHARED_RELS) % 2) {
            this.calcStraightRel();
        } else {
            this.calcCurvedRel();
        }
        this.drawFromCache();
    }

    drawFromCache() {
        this.ctx.fillStyle = this.style.captionStyle || "black";
        this.ctx.font = this.style.fontSize + "px Arial";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";

        if (this.cache.curved) {
            let { endAngle, startAngle } = this.cache.curved;
            let dAngle = endAngle - startAngle;
            if (startAngle > endAngle) {
                dAngle = Math.atan2(Math.sin(startAngle - endAngle), Math.cos(startAngle - endAngle));
                [endAngle, startAngle] = [startAngle, endAngle];
            }
            let dist = Math.abs(dAngle) * this.cache.curved.r;
            const centerAngle = Math.atan2(Math.sin(startAngle + dAngle / 2), Math.cos(startAngle + dAngle / 2));

            const textCenterX = this.cache.curved.cx + this.cache.curved.r * Math.cos(centerAngle);
            const textCenterY = this.cache.curved.cy + this.cache.curved.r * Math.sin(centerAngle);

            let captionSpace = null;
            if (this.properties.caption && !Number.isNaN(dist)) {
                const [visibleCaption, captionWidth] = this.calcVisibleCaption(dist);
                this.ctx.save();
                this.ctx.translate(textCenterX, textCenterY);
                if (centerAngle < 0) {
                    this.ctx.rotate(centerAngle + Math.PI / 2);
                } else {
                    this.ctx.rotate(centerAngle - Math.PI / 2);
                }
                this.ctx.fillText(visibleCaption, 0, 0);
                const textWidthAngle = Math.acos(1 - Math.pow(captionWidth / this.cache.curved.r, 2) / 2);
                const textStartAngle = centerAngle - textWidthAngle / 2;
                const textEndAngle = centerAngle + textWidthAngle / 2;
                this.ctx.restore();
                captionSpace = {
                    width: captionWidth,
                    x: textCenterX,
                    y: textCenterY,
                    centerAngle,
                    textStartAngle,
                    textEndAngle,
                };
            }

            this.ctx.strokeStyle = this.style.color;
            this.ctx.lineWidth = this.style.strokeWidth;
            if (!captionSpace) {
                this.ctx.beginPath();
                this.ctx.arc(
                    this.cache.curved.cx,
                    this.cache.curved.cy,
                    this.cache.curved.r,
                    this.cache.curved.startAngle,
                    this.cache.curved.endAngle
                );
                this.ctx.stroke();
            } else {
                this.ctx.beginPath();

                if (dist > captionSpace.width) {
                    this.ctx.arc(
                        this.cache.curved.cx,
                        this.cache.curved.cy,
                        this.cache.curved.r,
                        this.cache.curved.startAngle,
                        captionSpace.textStartAngle
                    );
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.arc(
                        this.cache.curved.cx,
                        this.cache.curved.cy,
                        this.cache.curved.r,
                        captionSpace.textEndAngle,
                        this.cache.curved.endAngle
                    );
                    this.ctx.stroke();
                }
            }

            if (this.cache.curved.arrowAngle !== undefined) {
                this.drawArrow(this.cache.curved.arrowAngle, this.style.color);
            }
        } else if (this.cache.straight) {
            let captionSpace = null;
            const x = this.cache.straight.start.x;
            const dx = this.cache.straight.end.x - x;
            const y = this.cache.straight.start.y;
            const dy = this.cache.straight.end.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (this.properties.caption) {
                const [visibleCaption, captionWidth] = this.calcVisibleCaption(dist);
                if (!visibleCaption) {
                    return;
                }
                this.ctx.save();
                this.ctx.translate(x + dx / 2, y + dy / 2);
                if (dx > 0) {
                    this.ctx.rotate(Math.atan2(dy / 2, dx / 2));
                } else {
                    this.ctx.rotate(Math.atan2(dy / 2, dx / 2) + Math.PI);
                }
                this.ctx.fillText(visibleCaption, 0, 0);
                this.ctx.restore();
                captionSpace = { width: captionWidth, x: x + dx / 2, y: y + dy / 2 };
            }

            this.ctx.moveTo(this.cache.straight.start.x, this.cache.straight.start.y);
            if (!captionSpace) {
                this.ctx.lineTo(this.cache.straight.end.x, this.cache.straight.end.y);
            } else {
                const textStartX = x - (dist / 2 - captionSpace.width / 2) * Math.cos(this.cache.straight.arrowAngle);
                const textStartY = y - (dist / 2 - captionSpace.width / 2) * Math.sin(this.cache.straight.arrowAngle);
                this.ctx.lineTo(textStartX, textStartY);

                const textEndX = textStartX - captionSpace.width * Math.cos(this.cache.straight.arrowAngle);
                const textEndY = textStartY - captionSpace.width * Math.sin(this.cache.straight.arrowAngle);
                this.ctx.moveTo(textEndX, textEndY);
                this.ctx.lineTo(this.cache.straight.end.x, this.cache.straight.end.y);
            }
            this.ctx.strokeStyle = this.style.color;
            this.ctx.lineWidth = this.style.strokeWidth;
            this.ctx.stroke();
            this.drawArrow(this.cache.straight.arrowAngle, this.style.color);
        }
    }

    calcCurvedRel() {
        if (this.from.id === this.to.id) {
            return;
        }
        if (this.numberOfSharedRels() > this.MAX_SHARED_RELS && this.spreadIndex >= this.MAX_SHARED_RELS) {
            return;
        }
        this.cache.curved = null;
        const numDrawnSharedRels = Math.min(this.numberOfSharedRels(), this.MAX_SHARED_RELS);

        const arcIndex = Math.floor((this.spreadIndex + (numDrawnSharedRels % 2)) / 2) - (numDrawnSharedRels % 2);
        let arcDirectionClockwise = true;
        if (numDrawnSharedRels % 2) {
            if (this.spreadIndex % 2) {
                arcDirectionClockwise = false;
            }
        } else {
            if (this.spreadIndex % 2 === 0) {
                arcDirectionClockwise = false;
            }
        }

        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;
        const len = Math.sqrt(dx * dx + dy * dy);

        // If we're overlapping the other connected node, don't draw anything
        if (len < this.from.getStrokedR() + this.to.getStrokedR() + this.arrowSize.height) {
            this.cache.curved = {};
            return;
        }
        // Flip sides to don't have overlapping rels
        if (dx < 0) {
            arcDirectionClockwise = !arcDirectionClockwise;
        }
        // Curve fitting from manual testing
        // Only handles up to a certain amount. This is why we have the MAX_SHARED_RELS
        const kFactor = 1.28666 - 0.323441 * Math.log(2.64525 * numDrawnSharedRels - 3.07871);
        const r = kFactor * numDrawnSharedRels * len * (1 / (arcIndex + 1) / (1 / (arcIndex + 1) + 0.6));
        const sweepA = Math.asin(len / (2 * r));
        const h = r * Math.cos(sweepA);

        let cx = this.from.x + dx / 2 - h * (-dy / len);
        let cy = this.from.y + dy / 2 - h * (dx / len);

        if (!arcDirectionClockwise) {
            cx = this.from.x + dx / 2 - h * (dy / len);
            cy = this.from.y + dy / 2 - h * (-dx / len);
        }

        let startAngle = Math.atan2(this.from.y - cy, this.from.x - cx);
        let endAngle = Math.atan2(this.to.y - cy, this.to.x - cx);
        if (arcDirectionClockwise) {
            [startAngle, endAngle] = [endAngle, startAngle];
        }

        let arrowAngle;
        // Calculate arc offsets (we don't want to draw from node center) and where arrow should be
        if (arcDirectionClockwise) {
            const isecs = findIntersections(
                { ...this.to, r: this.to.getStrokedR() + this.arrowSize.height },
                { x: cx, y: cy, r }
            );
            arrowAngle = Math.atan2(this.to.y - isecs.yi2, this.to.x - isecs.xi2) + Math.PI;
            startAngle = startAngle + (this.to.getStrokedR() + this.arrowSize.height) / r;
            endAngle = endAngle - this.from.getStrokedR() / r;
        } else {
            const isecs = findIntersections(
                { ...this.to, r: this.to.getStrokedR() + this.arrowSize.height },
                { x: cx, y: cy, r }
            );
            arrowAngle = Math.atan2(isecs.yi - this.to.y, isecs.xi - this.to.x);
            startAngle = startAngle + this.from.getStrokedR() / r;
            endAngle = endAngle - (this.to.getStrokedR() + this.arrowSize.height) / r;
        }
        this.cache.curved = { cx, cy, r, startAngle, endAngle, arrowAngle };
    }

    calcStraightRel() {
        this.cache.straight = null;
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < this.from.getStrokedR() + this.to.getStrokedR() + this.arrowSize.height) {
            return;
        }

        const angle = Math.atan2(this.from.y - this.to.y, this.from.x - this.to.x);
        const start = {
            x: this.from.x + -1 * this.from.getStrokedR() * Math.cos(angle),
            y: this.from.y + -1 * this.from.getStrokedR() * Math.sin(angle),
        };
        const end = {
            x: this.to.x + (this.to.getStrokedR() + this.arrowSize.height) * Math.cos(angle),
            y: this.to.y + (this.to.getStrokedR() + this.arrowSize.height) * Math.sin(angle),
        };
        if (this.from.id === this.to.id) {
            return;
        }

        this.cache.straight = {
            start,
            end,
            arrowAngle: angle,
        };
    }

    drawArrow(angle, color = this.style.color) {
        const x = this.to.x + this.to.getStrokedR() * Math.cos(angle);
        const y = this.to.y + this.to.getStrokedR() * Math.sin(angle);

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.arrowSize.height, -this.arrowSize.width);
        this.ctx.lineTo(this.arrowSize.height, this.arrowSize.width);
        this.ctx.fillStyle = color;
        this.ctx.fill();

        this.ctx.translate(-x, -y);
        this.ctx.restore();
    }
    calcVisibleCaption(dist) {
        let caption = this.properties.caption;
        let dots = "";
        let metrics = { width: 0 };

        while (caption.length) {
            metrics = this.ctx.measureText(caption + dots);
            if (metrics.width + this.padding > dist - 2 * this.padding) {
                caption = caption.slice(0, -1);
                dots = "...";
            } else {
                break;
            }
        }
        return [caption + dots, metrics.width + this.padding];
    }
}

export default Rel;
