import TextMarquee, { Direction } from "../src";

process.stdout.write("\n\n\n");
const marquees = [
    new TextMarquee("Hello World!", {
        size: 80,
        updateInterval: 100,
        padStr: " >---< ",
        padding: 1,
        scrollAmount: 3,
        formatter: (msg:string) => {
            process.stdout.cursorTo(0, process.stdout.rows - 2);
            process.stdout.clearLine(0);
            process.stdout.write(msg);
            process.stdout.cursorTo(0, process.stdout.rows - 2);
        }
    }),
    new TextMarquee("Ping", {
        size: 40,
        padding: 1,
        updateInterval: 50,
        scrollAmount: 1,
        formatter: (msg:string) => {
            process.stdout.cursorTo(0, process.stdout.rows - 3);
            process.stdout.clearLine(0);
            process.stdout.write(" ".repeat(20) + msg);
            process.stdout.cursorTo(0, process.stdout.rows - 3);
        }
    }),
    new TextMarquee("pong", {
        size: 40,
        padding: 1,
        updateInterval: 500,
        scrollAmount: 1,
        direction: Direction.Right,
        formatter: (msg:string) => {
            process.stdout.cursorTo(0, process.stdout.rows);
            process.stdout.clearLine(0);
            process.stdout.write(" ".repeat(20) + msg);
            process.stdout.cursorTo(0, process.stdout.rows);
        }
    }),
];
for (let marquee of marquees) {
    marquee.start();
}

setTimeout(() => {
    marquees[2].setString("PONG");
    marquees[2].setUpdateInterval(100);
}, 5000);

setTimeout(() => {
    marquees[2].stop();
}, 8000);

setTimeout(() => {
    marquees[2].start();
}, 12000);

setTimeout(() => {
    marquees[0].direction = Direction.Right;
    marquees[0].updateString("Bye!");
}, 3000);

setTimeout(() => {
    for (let marquee of marquees) {
        marquee.stop();
    }
    process.stdout.cursorTo(0, process.stdout.rows);
    process.stdout.write("\n");
}, 20000);
