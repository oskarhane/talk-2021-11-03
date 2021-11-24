class Node {
    constructor({ id, x, y, ctx, style = {}, caption = { text: "" }, onClick }) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.caption = caption;
        this.ctx = ctx;
        this.style = style;
        this.style.strokeWidth = 3;
        this.dragged = false;

        this.fontSize = 20;
        this.updateRadius();
        this.onClick = onClick || function () {};
    }
    updateRadius() {
        this.style.radius = this.style.radius || 20;
        this.r = this.style.radius;
        this.calculateFontSize();
    }
    updateCaption(text) {
        this.caption.text = text;
    }
    updateStyle(style) {
        const radius = Number(style.radius || this.style.radius);
        this.style = { ...this.style, ...style, radius };
        this.updateRadius();
    }
    clicked() {
        this.onClick(this);
    }
    getStrokedR() {
        return this.style.radius || 20 + this.style.strokeWidth / 2;
    }
    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.style.radius || 20, 0, Math.PI * 2);
        this.ctx.fillStyle = this.style.fillStyle || "white";
        this.ctx.fill();
        this.ctx.lineWidth = this.style.strokeWidth;
        this.ctx.strokeStyle = this.style.strokeStyle || "black";
        if (this.dragged) {
            this.ctx.strokeStyle = this.style.strokeStyle || "red";
        }
        this.ctx.stroke();

        if (this.caption.text) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.style.captionStyle || "black";
            this.ctx.textAlign = "center";
            this.ctx.font = this.fontSize + "px Arial";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.caption.text, this.x, this.y);
        }
    }
    isInside(x, y) {
        return (x - this.x) ** 2 + (y - this.y) ** 2 <= this.getStrokedR() ** 2;
    }
    calculateFontSize() {
        if (this.caption.text) {
            this.ctx.font = this.fontSize + "px Arial";
            const text = this.ctx.measureText(this.caption.text);
            if (text.width > this.r * 2 - 10) {
                this.fontSize--;
                this.calculateFontSize();
            } else if (text.width < this.r * 1.1) {
                this.fontSize++;
                this.calculateFontSize();
            }
        }
    }
}

export default Node;
