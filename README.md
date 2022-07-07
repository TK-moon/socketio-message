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


---

# 구현 예정 or 구현 못한 부분

## backend

- 읽지 않은 message count
  - LAW QUERY :(
- 새로운 message 실시간 수신
  - room list를 받아와서 모든 room에 join해야하나?
- room list에서 최신 message와 messageTime을 가져오지 못함
  - SQL 어려움