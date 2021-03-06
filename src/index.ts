export enum Direction {
    Left,
    Right
}

export function defaultRenderer(msg: string) {
    const stream = process.stdout;
    stream.cursorTo(0, stream.rows);
    stream.clearLine(0);
    stream.write(msg);
    stream.cursorTo(0, stream.rows);
}

export default class TextMarquee {
    private viewSize: number;
    private padding: number;
    private padStr: string;
    private str: string = "";
    public direction: Direction;

    private renderer: (buffer: string) => void;
    private updateInterval: number;
    public scrollAmount: number;

    private tick: number = 0;
    private buffer: string = "";
    private emptyBuffer: number = 0;
    private timeout?: NodeJS.Timeout;

    constructor(str: string, {
        viewSize: viewSize = 20,
        padding = 5,
        padStr = " ",
        direction = Direction.Left,
        render = defaultRenderer,
        updateInterval = 200,
        scrollAmount = 1
    }) {
        this.viewSize = viewSize;
        this.padding = padding;
        this.padStr = padStr;
        this.direction = direction

        this.updateInterval = updateInterval;
        this.scrollAmount = scrollAmount;

        this.setString(str);

        this.renderer = render;
    }

    ticks() {
        return this.tick;
    }

    incrementTick = () => {
        const lastTick = Math.floor(this.tick);
        this.tick += this.scrollAmount;

        // Handle scrollAmounts < 1.0
        if (Math.floor(this.tick) == lastTick) {
            return;
        }

        const actualScrollAmount = Math.ceil(this.scrollAmount);

        let append = "";

        if (this.emptyBuffer) {
            if (this.emptyBuffer - actualScrollAmount < 0) {
                const length = actualScrollAmount - this.emptyBuffer;
                append = this.substring(this.emptyBuffer, this.emptyBuffer + length);
            }
            this.emptyBuffer = Math.max(0, this.emptyBuffer - actualScrollAmount);
        } else {
            append = this.substring(0, actualScrollAmount);
        }

        this.buffer = this.substring(actualScrollAmount);
        if (this.direction === Direction.Left) {
            this.buffer += append;
        } else {
            this.buffer = append + this.buffer;
        }

        this.renderer(this.substring(0, this.viewSize));
    }

    private substring(start: number, end?: number) {
        if (this.direction === Direction.Left) {
            return this.buffer.substring(start, end);
        } else {
            if (end) {
                return this.buffer.substring(this.buffer.length - start,  this.buffer.length - end);
            }
            return this.buffer.substring(0, this.buffer.length - start);
        }
    }

    start() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
        this.timeout = setInterval(this.incrementTick, this.updateInterval);
    }

    stop() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    setUpdateInterval(updateInterval: number) {
        this.stop();
        this.updateInterval = updateInterval;
        this.start();
    }
    setString(str: string) {
        this.str = str;
        const tmp = (this.str + this.padStr.repeat(this.padding));
        this.buffer = tmp.repeat(Math.ceil(this.viewSize / tmp.length));
    }
    updateString(str: string) {
        this.str = str;
        this.buffer = this.substring(0, this.viewSize);
        this.emptyBuffer = this.buffer.length;
        const tmp = (this.str + this.padStr.repeat(this.padding));
        if (this.direction === Direction.Left) {
            this.buffer += tmp.repeat(Math.ceil(this.viewSize / tmp.length));
        } else {
            this.buffer = tmp.repeat(Math.ceil(this.viewSize / tmp.length)) + this.buffer;
        }
    }
}
