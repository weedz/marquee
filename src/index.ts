export enum Direction {
    Left,
    Right
}

export default class TextMarquee {
    private size: number;
    private padding: number;
    private padStr: string;
    private str: string = "";
    public direction: Direction;

    private formatter: Function;
    private updateInterval: number;
    public scrollAmount: number;

    private tick: number = 0;
    private buffer: string = "";
    private emptyBuffer: number = 0;
    private timeout?: NodeJS.Timeout;

    constructor(str: string, { size = 20, padding = 5, padStr = " ", direction = Direction.Left, formatter, updateInterval = 200, scrollAmount = 1 }: {
        size?: number;
        padding?: number;
        padStr?: string;
        direction?: Direction;
        updateInterval?: number;
        scrollAmount?: number;
        formatter?: (buffer: string) => void;
    }) {
        this.size = size;
        this.padding = padding;
        this.padStr = padStr;
        this.direction = direction

        this.updateInterval = updateInterval;
        this.scrollAmount = scrollAmount;

        this.setString(str);

        this.formatter = formatter || ((str: string) => {
            const stream = process.stdout;
            stream.cursorTo(0, stream.rows);
            stream.clearLine(0);
            stream.write(str);
            stream.cursorTo(0, stream.rows);
        });
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

        this.formatter(this.substring(0, this.size));
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
        this.buffer = tmp.repeat(Math.ceil(this.size / tmp.length));
    }
    updateString(str: string) {
        this.str = str;
        this.buffer = this.substring(0, this.size);
        this.emptyBuffer = this.buffer.length;
        const tmp = (this.str + this.padStr.repeat(this.padding));
        if (this.direction === Direction.Left) {
            this.buffer += tmp.repeat(Math.ceil(this.size / tmp.length));
        } else {
            this.buffer = tmp.repeat(Math.ceil(this.size / tmp.length)) + this.buffer;
        }
    }
}
