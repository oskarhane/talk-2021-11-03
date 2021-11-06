import { findIntersections } from "./utils";

class Rel {
    constructor({ from, to, ctx, spreadIndex, numberOfSharedRels, properties = {}, style = {} }) {
        this.to = to;
        this.from = from;
        this.ctx = ctx;
        this.numberOfSharedRels = numberOfSharedRels;
        this.spreadIndex = spreadIndex - 1;
        this.MAX_SHARED_RELS = 12;
        this.arrowSize = { height: 10, width: 4 };
        const color = style.color || "rgba(0, 80, 0, .8)";
        const strokeWidth = style.strokeWidth || 2;
        this.style = { color, strokeWidth, fontSize: 16 };
        this.cache = { curved: null, straight: null };
        this.properties = properties;
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
        if (this.cache.curved) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.style.color;
            this.ctx.lineWidth = this.style.strokeWidth;
            this.ctx.arc(
                this.cache.curved.cx,
                this.cache.curved.cy,
                this.cache.curved.r,
                this.cache.curved.startAngle,
                this.cache.curved.endAngle
            );
            this.ctx.stroke();
            this.drawArrow(this.cache.curved.arrowAngle, this.style.color);
        } else if (this.cache.straight) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.cache.straight.start.x, this.cache.straight.start.y);
            this.ctx.lineTo(this.cache.straight.end.x, this.cache.straight.end.y);
            this.ctx.strokeStyle = this.style.color;
            this.ctx.lineWidth = this.style.strokeWidth;
            this.ctx.stroke();
            this.drawArrow(this.cache.straight.arrowAngle, this.style.color);
            if (this.properties.caption) {
                this.ctx.fillStyle = this.style.captionStyle || "black";
                this.ctx.textAlign = "center";
                this.ctx.font = this.style.fontSize + "px Arial";
                this.ctx.textBaseline = "middle";

                this.ctx.beginPath();
                const metrics = this.ctx.measureText(this.properties.caption);
                const x = this.from.x;
                const dx = this.to.x - x;
                const y = this.from.y;
                const dy = this.to.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // If text is longer than the rel, don't print it
                if (metrics.width > dist - this.from.getStrokedR() - this.to.getStrokedR() - this.arrowSize.height) {
                    return;
                }
                this.ctx.save();
                this.ctx.translate(x + dx / 2, y + dy / 2);
                if (dx > 0) {
                    this.ctx.rotate(Math.atan2(dy / 2, dx / 2));
                } else {
                    this.ctx.rotate(Math.atan2(dy / 2, dx / 2) + Math.PI);
                }
                this.ctx.fillText(this.properties.caption, 0, -10);
                this.ctx.restore();
            }
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
            return;
        }
        const dist = len / 2;

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
            (cx = this.from.x + dx / 2 - h * (dy / len)), (cy = this.from.y + dy / 2 - h * (-dx / len));
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
}

export default Rel;
