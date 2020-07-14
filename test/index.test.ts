import TextMarquee, { Direction } from "../src";

test('default', async () => {
    let buffer = "";
    let stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(5);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong      pong     pong      pong     pong   ");
}, 500);

test('direction right', async () => {
    let buffer = "";
    let stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            direction: Direction.Right,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(5);
    expect(buffer).toEqual("   pong     pong        pong     pong        pong     pong  g     pong     pong ng     pong     pong");
}, 500);

test('change direction', async () => {
    let buffer = "";
    let stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() === 3) {
                    marquee.direction = Direction.Right;
                }
                if (marquee.ticks() === 7) {
                    marquee.direction = Direction.Left;
                }
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(10);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong pong     pong     po pong     pong     p  pong     pong        pong     pong    pong     pong     poong     pong     ponng     pong     pong");
}, 500);

test('change text', async () => {
    let buffer = "";
    let stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() === 3) {
                    marquee.updateString("PONG");
                }
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(10);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong      pong     pong P    pong     pong PO   pong     pong PON  pong     pong PONG pong     pong PONG pong     pong PONG  ong     pong PONG   ");
}, 500);

test('change text, direction right', async () => {
    let buffer = "";
    let stopAt = 10;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            direction: Direction.Right,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() === 3) {
                    marquee.updateString("PONG");
                }
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(10);
    expect(buffer).toEqual("   pong     pong        pong     pong        pong     pong        pong     pong        pong     pong        pong     pon         pong     po          pong     pG          pong     NG          pong    ");
}, 500);

test('slow scroll', async () => {
    let buffer = "";
    let stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            scrollAmount: .3,   // this does not change the output but be formatter should still be called just 5 times
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(5);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong      pong     pong      pong     pong   ");
}, 500);

test('start/stop', async () => {
    let buffer = "";
    let stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() >= stopAt) {
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

    expect(cb).toHaveBeenCalledTimes(6);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong      pong     pong      pong     pong   ");
}, 500);

test('start/stop', async () => {
    let buffer = "";
    let stopAt = 5;

    const cb = jest.fn();

    await new Promise((resolve, reject) => {
        const marquee = new TextMarquee("pong", {
            updateInterval: 10,
            formatter: (msg: string) => {
                buffer += msg;
                cb();
                if (marquee.ticks() >= stopAt) {
                    resolve();
                }
                if (marquee.ticks() === 3) {
                    marquee.setUpdateInterval(50);
                }
            }
        });
        marquee.start();
    });

    expect(cb).toHaveBeenCalledTimes(5);
    expect(buffer).toEqual("ong     pong     ponng     pong     pongg     pong     pong      pong     pong      pong     pong   ");
}, 2000);
