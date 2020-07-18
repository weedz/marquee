import TextMarquee, { Direction } from "../src";

test('short string', async () => {
    // we "scroll" a string that is shorter than viewSize(20)
    const frames: string[] = [];
    const stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "     pong     pong  ",
        "    pong     pong   ",
    ]);
}, 500);

test('long string', async () => {
    // we "scroll" a string that is longer than viewSize(20)
    const frames: string[] = [];
    const stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("Hello, World! Ping, ping, pong, Pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ello, World! Ping, p",
        "llo, World! Ping, pi",
        "lo, World! Ping, pin",
        "o, World! Ping, ping",
        ", World! Ping, ping,",
        " World! Ping, ping, ",
        "World! Ping, ping, p",
        "orld! Ping, ping, po",
        "rld! Ping, ping, pon",
        "ld! Ping, ping, pong",
    ]);
}, 500);

test('direction right', async () => {
    const frames: string[] = [];
    const stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            direction: Direction.Right,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "   pong     pong    ",
        "    pong     pong   ",
        "     pong     pong  ",
        "g     pong     pong ",
        "ng     pong     pong",
    ]);
}, 500);

test('change direction', async () => {
    const frames: string[] = [];
    const stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() === 3) {
                    marquee.direction = Direction.Right;
                }
                if (marquee.ticks() === 7) {
                    marquee.direction = Direction.Left;
                }
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "pong     pong     po",
        " pong     pong     p",
        "  pong     pong     ",
        "   pong     pong    ",
        "pong     pong     po",
        "ong     pong     pon",
        "ng     pong     pong",
    ]);
}, 500);

test('change text', async () => {
    const frames: string[] = [];
    const stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() === 3) {
                    marquee.updateString("PONG");
                }
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "     pong     pong P",
        "    pong     pong PO",
        "   pong     pong PON",
        "  pong     pong PONG",
        " pong     pong PONG ",
        "pong     pong PONG  ",
        "ong     pong PONG   ",
    ]);
}, 500);

test('change text, direction right', async () => {
    const frames: string[] = [];
    const stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            direction: Direction.Right,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() === 3) {
                    marquee.updateString("PONG");
                }
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "   pong     pong    ",
        "    pong     pong   ",
        "     pong     pong  ",
        "      pong     pong ",
        "       pong     pong",
        "        pong     pon",
        "         pong     po",
        "          pong     p",
        "G          pong     ",
        "NG          pong    ",
    ]);
}, 500);

test('slow scroll', async () => {
    const frames: string[] = [];
    const stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            scrollAmount: .3,   // this does not change the output but be formatter should still be called just 5 times
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "     pong     pong  ",
        "    pong     pong   ",
    ]);
}, 500);

test('start/stop', async () => {
    const frames: string[] = [];
    const stopAt = 5;

    const cb = jest.fn();

    const start = process.hrtime.bigint();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
                if (marquee.ticks() === 3) {
                    marquee.stop();
                    setTimeout(() => {
                        cb();
                        marquee.start();
                    }, 100);
                }
            }
        });
        marquee.start();
    });

    if (process.hrtime.bigint() - start < 150) {
        throw "Did not stop.";
    }

    expect(cb).toHaveBeenCalledTimes(stopAt + 1);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "     pong     pong  ",
        "    pong     pong   ",
    ]);
}, 5000);

test('change interval', async () => {
    const frames: string[] = [];
    const stopAt = 5;

    const cb = jest.fn();

    const start = process.hrtime.bigint();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            render: (msg: string) => {
                frames.push(msg);
                cb();
                if (marquee.ticks() >= stopAt) {
                    marquee.stop();
                    resolve();
                }
                if (marquee.ticks() === 3) {
                    marquee.setUpdateInterval(50);
                }
            }
        });
        marquee.start();
    });

    if (process.hrtime.bigint() - start < 130) {
        throw "Did not stop.";
    }

    expect(cb).toHaveBeenCalledTimes(stopAt);
    expect(frames).toEqual([
        "ong     pong     pon",
        "ng     pong     pong",
        "g     pong     pong ",
        "     pong     pong  ",
        "    pong     pong   ",
    ]);
}, 2000);
