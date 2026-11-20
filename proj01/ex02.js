
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// 서버 생성
const server = http.createServer((req, res) => {
    console.log(req.method);

    // 응답 헤더
    // res.setHeader("Content-Type", "text/plain");

    // 바디 전송
    // res.write("Hello, Node");
    // res.end(); // 응답 종료

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    const filePath = path.join(__dirname, "index.html");

    // index.html 파일이 없으면 자동 생성
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
            filePath,
            `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Node.js 서버</title>
</head>
<body>
    <h1>Hello, Node!</h1>
    <p>Node.js HTTP 서버가 정상적으로 실행되었습니다.</p>
</body>
</html>`,
            "utf8"
        );
    }

    const readStream = fs.createReadStream(filePath, "utf8");

    readStream.on("error", (err) => {
        console.error("파일 읽기 오류:", err.message);

        if (!res.headersSent) {
            res.writeHead(500, {
                "Content-Type": "text/plain; charset=utf-8"
            });
        }

        res.end("서버 오류가 발생했습니다.");
    });

    readStream.pipe(res);
});

// 서버 실행
server.listen(PORT, () => {
    console.log(`${PORT}번 포트로 서버 실행`);
});
