
class Wall {
    x: number;
    height: number;
    gap: number;
    width: number;
    crossed: boolean = false;

    constructor(x: number, height: number, gap: number, width: number) {
        this.x = x;
        this.height = height;
        this.gap = gap;
        this.width = width;
    }
}

export default Wall;
