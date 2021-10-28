class Node {
    constructor({ id, x, y, ctx, style = {}, properties = {} }) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.properties = properties;
        this.ctx = ctx;
        this.style = style;
        this.strokeWidth = 3;
        this.dragged = false;
        this.r = this.style.radius;

        this.style.fontSize = 20;
        this.calculateFontSize();
    }
    getStrokedR() {
        return this.style.radius || 20 + this.strokeWidth / 2;
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
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeStyle = this.style.strokeStyle || "black";
        if (this.dragged) {
            this.ctx.strokeStyle = this.style.strokeStyle || "red";
        }
        this.ctx.stroke();

        if (this.properties.caption) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.style.captionStyle || "black";
            this.ctx.textAlign = "center";
            this.ctx.font = this.style.fontSize + "px Arial";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.properties.caption, this.x, this.y);
        }
    }
    isInside(x, y) {
        return (x - this.x) ** 2 + (y - this.y) ** 2 <= this.getStrokedR() ** 2;
    }
    calculateFontSize() {
        if (this.properties.caption) {
            this.ctx.font = this.style.fontSize + "px Arial";
            const text = this.ctx.measureText(this.properties.caption);
            if (text.width > this.r * 2 - 10) {
                this.style.fontSize--;
                this.calculateFontSize();
            }
        }
    }
}

export default Node;
