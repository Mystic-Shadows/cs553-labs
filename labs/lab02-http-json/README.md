# Lab 2 - Hello HTTP + JSON
## Graduate Addition
* Added modulo operation
* Added unit tests for modulo

## How to Run
1. Open a terminal and run ```npm install``` if needed
2. Run ```npm run server``` in the same terminal
3. Use a browser or curl commands to interact with the server
4. Close the server by switching to its terminal and using ```ctrl-c```

## Commands
### health
Returns a JSON response showing that the server is running.
### echo
Accepts a JSON request body and returns the same data back to the client.
### requests
Returns information about how many requests the server has handled since it started.
### calculate
Input json object that includes:
* operation (string)
* a (number)
* b (number)

| Operation  | Meaning               |
| ---------- | --------------------- |
| `add`      | Add `a` and `b`       |
| `subtract` | Subtract `b` from `a` |
| `multiply` | Multiply `a` and `b`  |
| `divide`   | Divide `a` by `b`     |
| `modulo`   | Modulo `b` of `a`     |

Returns a result if the input object has no issues (divide by zero, bad operation, etc.)

## Reflection Questions
### What is the difference between a TCP message and an HTTP request?
TCP defines what happens to send a message and what defines what can be expected from its use. HTTP sits ontop of TCP as format that simplifies how the data is formatted. It also defines several basic operations and error codes, making it universal and easily portable between machines.

Specifically, the format between a message and a request differs. TCP can be just about anything whereas HTTP is expected to use one of a few commands, contain information about send/receive dataypes, and contain specific data.

### What does the `Content-Type: application/json` header tell the server?
`Content-Type: application/json` tells the server what format the inbound data is in. This allows the server to determine how to read the data.

### Why should a server return different HTTP status codes for different situations?
A server behaving correctly vs off-nominally should be made aware to the client. Furthermore, if there is off-nominal behavior, then knowing what sort and on whose end will speed up the debugging/repair process. Some status codes also imply the existence of data within the message.

### What happens if the client sends invalid JSON?
This is may be handled by the API or - especially if doesn't have the expected data - the server will need to validate the data before using it. Javascript is very forgiving so where other languages might throw an exception Javascript will produce _something_ and move on.

### How is this lab different from Lab 1?
The main difference is the level that we are working at. We trade some of the tedium of working with TCP sockets for HTTP which is easier but binds the developer to its contract (restrictions and expectations). Instead of viewing communication as streams of information, we now see them as json objects. These json objects allow us to pass information about the value, such as its type and how its grouped with the other data sent alongside it.

---
---
---
# ANNOTATED Lab 2 - Hello HTTP + JSON

In Lab 1, you worked directly with a TCP socket and created a small command-based server.

In this lab, you will move up one layer and build a small HTTP JSON service. Instead of inventing your own command format, you will use HTTP methods, paths, status codes, headers, and JSON request/response bodies.

## Learning Goals

By the end of this lab, you should be able to:

* Explain the difference between a raw TCP message and an HTTP request.
* Create a basic HTTP server in Node.js.
* Read the HTTP method and request path.
* Parse a JSON request body.
* Return JSON responses.
* Use appropriate HTTP status codes.
* Handle invalid or unexpected client input without crashing the server.
* Test HTTP request-handling behavior.

## Starter Code Structure

The starter code is located in:

```text
labs/lab02-http-json/starter/
```

The starter project has this structure:

```text
starter/
├── package.json
├── src/
│   └── server.js
└── test/
    └── server.test.js
```

### File Descriptions

| File                  | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `src/server.js`       | Starts the HTTP server and handles incoming HTTP requests. |
| `test/server.test.js` | Contains automated tests for the HTTP JSON service.        |
| `package.json`        | Defines project metadata, dependencies, and npm scripts.   |

## Required Features

Your HTTP server must support the following routes.

### `GET /health` [X]

Returns a JSON response showing that the server is running.

Example response:

```json
{
  "status": "ok"
}
```

### `POST /echo` [X]

Accepts a JSON request body and returns the same data back to the client.

Example request body:

```json
{
  "message": "hello"
}
```

Example response:

```json
{
  "message": "hello"
}
```

### `POST /calculate` [X]

Accepts a JSON request body with an operation and two numbers.

Example request body:

```json
{
  "operation": "add",
  "a": 2,
  "b": 3
}
```

Example response:

```json
{
  "result": 5
}
```

Your server must support at least the following operations:

| Operation  | Meaning               |
| ---------- | --------------------- |
| `add`      | Add `a` and `b`       |
| `subtract` | Subtract `b` from `a` |
| `multiply` | Multiply `a` and `b`  |
| `divide`   | Divide `a` by `b`     |

The server should return an error response for unsupported operations.

### `GET /requests` [X]

Returns information about how many requests the server has handled since it started.

Example response:

```json
{
  "count": 4
}
```

## Error Handling

Your server should not crash when it receives bad input.

At minimum, your server should handle:

* Unknown routes.
* Unsupported HTTP methods.
* Invalid JSON.
* Missing required fields.
* Unsupported calculation operations.
* Division by zero.

Use reasonable HTTP status codes such as:

| Status Code | Meaning               |
| ----------- | --------------------- |
| `200`       | OK                    |
| `400`       | Bad request           |
| `404`       | Not found             |
| `405`       | Method not allowed    |
| `500`       | Internal server error |

Error responses should be returned as JSON.

Example error response:

```json
{
  "error": "Invalid JSON"
}
```

## Running the Lab

First, move into the starter directory:

```bash
cd labs/lab02-http-json/starter
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run server
```

By default, the server should listen on port `3000`.

You can test the server in a browser by visiting:

```text
http://localhost:3000/health
```

You can also test it with `curl`.

Example:

```bash
curl http://localhost:3000/health
```

Example `POST /echo` request:

```bash
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

Example `POST /calculate` request:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":2,"b":3}'
```

## Configuring the Port

The server should use port `3000` by default.

You can run the server on a different port by setting the `PORT` environment variable:

```bash
PORT=4000 npm run server
```

Then send requests to the new port:

```bash
curl http://localhost:4000/health
```

## Testing

This lab includes automated tests for the HTTP JSON service.

Run the tests from the starter directory:

```bash
npm test
```

Some tests may fail when you first receive the starter code. Your job is to update the implementation until the required tests pass.

The tests should check behavior such as:

* `GET /health` returns a JSON status response.
* `POST /echo` returns the submitted JSON data.
* `POST /calculate` performs supported calculations.
* Unknown routes return an error.
* Invalid JSON returns an error.
* The server does not crash on bad input.

You may also run the tests in watch mode if supported by the starter project:

```bash
npm run test:watch
```

## Suggested Workflow

1. Run the server before changing anything.
2. Try `GET /health` manually in a browser or with `curl`.
3. Run the automated tests.
4. Open `src/server.js`.
5. Implement one route at a time.
6. Run `npm test` after each change.
7. Test manually with `curl`.
8. Update this README if your final behavior differs from the examples.

## Reflection Questions

Answer the following questions in your submission:

1. What is the difference between a TCP message and an HTTP request?
2. What does the `Content-Type: application/json` header tell the server?
3. Why should a server return different HTTP status codes for different situations?
4. What happens if the client sends invalid JSON?
5. How is this lab different from Lab 1?

## Graduate Students

Graduate students should complete one additional feature.

Choose one of the following:

1. Add a new route, such as `GET /time` or `POST /uppercase`.
2. Add one additional calculation operation and document it. [X]
3. Improve the request counter so it tracks counts by route.
4. Add additional automated tests for error handling. [~~]

Document your graduate extension in your submission.

## Submission

Submit your completed lab according to the course submission instructions.

Your submission should include:

* [X] Your updated source code.
* [X] Your completed HTTP JSON server.
* [X] Your updated README if you changed or extended the API.
* [X] Your answers to the reflection questions.
* [X] Any graduate extension work, if applicable.

Before submitting, verify that:

```bash
npm test
```

runs successfully.

Submit your GitHub link in the Canvas assignment for this lab.
