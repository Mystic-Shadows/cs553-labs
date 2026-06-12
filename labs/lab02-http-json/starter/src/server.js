import http from "node:http";

const DEFAULT_PORT = 3000;

let requestCount = 0;

export function sendJson(res, statusCode, body) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(body));
}

export function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            if (body.trim() === "") {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });

        req.on("error", reject);
    });
}

export function handleCalculate(body) {
    let output = 0;

    if (!(Object.hasOwn(body, "operation") &&
        Object.hasOwn(body, "a") &&
        Object.hasOwn(body, "b"))) {
        return {
            statusCode: 400,
            response: {
                error: "Missing fields in request. Needs 'operation', 'a', 'b'"
            }
        };
    }

    if (!((typeof body.operation) == 'string' &&
          (typeof body.a) == 'number' &&
          (typeof body.b) == 'number')) {
        return {
            statusCode: 400,
            response: {
                error: "Bad type. 'operation' is a string. 'a' is a number. 'b' is a number."
            }
        };
    }

    switch (body.operation) {
        case "add":
            output = body.a + body.b;
            break;
        case "subtract":
            output = body.a - body.b;
            break;
        case "multiply":
            output = body.a * body.b;
            break;
        case "divide":
            if (body.b == 0) {
                return {
                    statusCode: 400,
                    response: {
                        error: "attempt to divide by 0"
                    }
                };
            }
            else {
                output = body.a / body.b;
            }
            break;
        case "modulo":
            if (body.b == 0) {
                return {
                    statusCode: 400,
                    response: {
                        error: "attempt to divide by 0"
                    }
                };
            }
            else {
                output = ((body.a % body.b) + body.b) % body.b; // True modulo operation since % is remainder in Javascript.
                // if the remainder is negative, then the addition of the modulo value will push it into the positive
                //   (since the value from a % b must be less than b)
                //   the following remainder operation will do nothing
                // if remainder is positive, then we are 'done'
                //   to put everything on one line, the addition need for the other case has the remainder taken again to
                //   force the positive back to the right value
            }
            break;
        default:
            return {
                statusCode: 400,
                response: {
                    error: "operation not recognized"
                }
            };

    }

    return {
        statusCode: 200,
        response: {
            result: output
        }
    };
}

export async function requestHandler(req, res) {
    requestCount += 1;

    const method = req.method;
    const url = req.url;

    if (method === "GET" && url === "/health") {
        sendJson(res, 200, { status: "ok" });
        return;
    }

    if (method === "GET" && url === "/requests") {
        sendJson(res, 200, { count: requestCount });
        return;
    }

    if (method === "POST" && url === "/echo") {
        try {
            const body = await readJsonBody(req);

            if (Object.hasOwn(body, "message")) {
                sendJson(res, 200, { message: body.message });
            } else {
                sendJson(res, 400, { error: "Missing 'message' field" });
            }
        } catch {
            sendJson(res, 400, { error: "Invalid JSON" });
        }

        return;
    }

    if (method === "POST" && url === "/calculate") {
        try {
            const body = await readJsonBody(req);
            const result = handleCalculate(body);

            sendJson(res, result.statusCode, result.response);
        } catch {
            sendJson(res, 400, { error: "Invalid JSON" });
        }

        return;
    }

    sendJson(res, 404, { error: "Not found" });
}

export function createServer() {
    return http.createServer(requestHandler);
}

export function resetState() {
    requestCount = 0;
}

if (import.meta.url === `file:///${process.argv[1].replaceAll("\\", "/")}`) {
    const port = process.env.PORT || DEFAULT_PORT;
    const server = createServer();

    server.listen(port, () => {
        console.log(`HTTP JSON server listening on port ${port}`);
    });
}