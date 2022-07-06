# SocketIO 채팅

## Stack

Frontend `React`, `Socket.io client`, `typescript`

Backend `node`, `express`, `socket.io`, `mysql with docker`

---

- 로그인 페이지
  - 비제어 컴포넌트
- 채팅메시지 무한로딩
  - MYSQL 커서를 써보려고 했으나 어려워서 실패
  - baseID를 파라미터로 받아 cursor 비슷하게 구현
- message 무한로딩 UX
  - Intersection Observer with custom hook and lodash debounce