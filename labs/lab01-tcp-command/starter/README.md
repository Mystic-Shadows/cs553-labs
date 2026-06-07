# Lab 1 - TCP Command Server Submission
## How to Run the Lab
1. Open a terminal and run ```npm install``` if needed
2. Run ```npm run server``` in the same terminal
3. In a new terminal, run ```npm run client```
4. Execute any commands desired on the client, see next section
5. Close the client by using the ```QUIT``` command
6. Close the server by switching to its terminal and using ```ctrl-c```

## Commands
| Client sends    | Server responds     |
| --------------- | ------------------- |
| `ECHO hello`    | `hello`             |
| `UPPER hello`   | `HELLO`             |
| `LOWER HELLO`   | `hello`             |
| `REVERSE hello` | `olleh`             |
| `TIME`          | current server time |
| `QUIT`          | closes connection   |
| unknown command | error message       |

## Answers to Reflection Questions
### What is the difference between the client and the server?
A server offers data or services. It may allow anyone to use its capabilities or only a few select clients. A client is a requestor of the data and/or services that the server provides. In a large distributed system, a program can be both. It can allow clients to connect and make requests while it itself is making requests to other servers. The difference between a client and server is what side of the relationship does a program lie on for a specific pair.

### Why does the server need to keep running after handling one request?
The server can handle multiple clients which may occur simultaneously or independently. A server does not know (normally) when all clients have been satisfied since there could be an unknown one that has not made contact yet.

### What happens if two clients connect at the same time?
The server makes initial contact over selected port (3000 in this case) and then assigns the connection to a unique port to free up the main port. This allows the server to server muliple clients.

### How is this different from HTTP?
HTTP is a higher level abstraction for networking than the sockets in this lab. HTTP uses socket within its abstraction. Sockets allow for a finer grain of control. In particular HTTP requires a client to poll for updated data whereas a server using sockets can send it without a request.

### Notes
Please let me know if you would prefer the reflection question answers in a separate document and/or if you would like screenshots of execution as well. Also, if you have any desired format for the submission 'readme's.

---
---
---

# Lab 1 - TCP Command Server Annotated Assignment Description

In this lab, you will extend a simple TCP echo server into a small command-based TCP server.

The lecture example showed a basic client/server program where the client sends text and the server echoes the same text back. This lab builds on that idea by adding a simple command protocol.

## Learning Goals

By the end of this lab, you should be able to:

* Explain the difference between a TCP client and a TCP server.
* Run a TCP server and connect to it with a client.
* Send and receive text over a socket.
* Implement simple command parsing.
* Use automated tests to check server command behavior.
* Describe a small text-based protocol.

## Starter Code Structure

The starter code is located in:

```
labs/lab01-tcp-command/starter/
```

The starter project has this structure:

```
starter/
├── package.json
├── src/
│   ├── client.js
│   ├── commands.js
│   └── server.js
└── test/
    └── commands.test.js
```

### File Descriptions

| File                    | Purpose                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `src/server.js`         | Starts the TCP server, accepts client connections, reads client input, and sends responses. |
| `src/client.js`         | Provides a simple command-line TCP client for testing the server manually.                  |
| `src/commands.js`       | Contains the command-handling logic. Most of your work will be here.                        |
| `test/commands.test.js` | Contains automated tests for the command-handling logic.                                    |
| `package.json`          | Defines project metadata, dependencies, and npm scripts.                                    |

## Required Features

1. The server must accept TCP client connections on a configurable port. [X]
2. The client must send one command at a time. [X]
3. The server must support `ECHO`, `UPPER`, `LOWER`, and `QUIT`. [X]
4. The server must return an error for unknown commands. [X]
5. The server must not crash when the client sends an empty line. [X]
6. The README must describe the protocol. [X]

### Graduate Students

7. Implement `REVERSE`  [X] or `TIME` [X] or add a new command [ ] and document it. [X]

## Command Protocol

The server accepts one text command per line.

Commands are case-insensitive, but the command arguments should be handled as normal text.

| Client sends    | Server responds     |
| --------------- | ------------------- |
| `ECHO hello`    | `hello`             |
| `UPPER hello`   | `HELLO`             |
| `LOWER HELLO`   | `hello`             |
| `REVERSE hello` | `olleh`             |
| `TIME`          | current server time |
| `QUIT`          | closes connection   |
| unknown command | error message       |

## Running the Lab

First, move into the starter directory:

```
cd labs/lab01-tcp-command/starter
```

Install dependencies:

```
npm install
```

Start the server:

```
npm run server
```

In a second terminal, move into the same starter directory and run the client:

```
npm run client
```

You should be able to type commands into the client and see responses from the server.

Example:

```
> ECHO hello
hello

> UPPER hello
HELLO

> QUIT
Goodbye.
```

## Configuring the Port

The server should use port `3000` by default.

You can run the server on a different port by setting the `PORT` environment variable:

```
PORT=4000 npm run server
```

Then run the client using the same port:

```
PORT=4000 npm run client
```

## Testing

This lab includes automated tests for the command-handling logic.

Run the tests from the starter directory:

```
npm test
```

The tests are focused on `src/commands.js`.

That means you can work on the command behavior without needing to manually start the TCP server every time.

The main function being tested is:

```
handleCommand(line)
```

The tests check that commands such as `ECHO`, `UPPER`, `LOWER`, `REVERSE`, `TIME`, and `QUIT` return the expected responses.

Some tests may fail when you first receive the starter code. Your job is to update the implementation until the required tests pass.

You may also run the tests in watch mode if supported by the starter project:

```
npm run test:watch
```

## Suggested Workflow

1. Run the server and client before changing anything.
2. Try the existing commands manually.
3. Run the automated tests.
4. Open `src/commands.js`.
5. Implement one command at a time.
6. Run `npm test` after each change.
7. Once the tests pass, test manually with the client.
8. Update this README to describe the final protocol.

## Reflection Questions

Answer the following questions in your submission:

1. What is the difference between the client and the server? [X]
2. Why does the server need to keep running after handling one request? [X]
3. What happens if two clients connect at the same time? [X]
4. How is this different from HTTP? [X]

## Submission

Submit your completed lab according to the course submission instructions.

Your submission should include:

* Your updated source code. [X]
* Your completed `commands.js`. [X]
* Your updated README protocol description. [X]
* Your answers to the reflection questions. [X]
* Any graduate extension work, if applicable. [X]

Before submitting, verify that:

```
npm test
```

runs successfully.
