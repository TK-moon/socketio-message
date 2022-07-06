# SocketIO 채팅

`React, SocketIO`

클라이언트 테스트로 로그인에 서버 인증은 하지 않음.
아무 계정이나 전부 로그인 가능.

- 로그인 페이지
  - 비제어 컴포넌트
- 채팅메시지 무한로딩
  - MYSQL 커서를 써보려고 했으나 어려워서 실패
  - baseID를 파라미터로 받아 cursor 비슷하게 구현



### BUG
- Safari prevChatMessageList baseID Bug
  - Safari에서 baseID를 변경하고, server.js에서 변경된 baseID 값을 정상적으로 받는데,
    쿼리가 정상적으로 바뀌었음에도 baseID가 없을 경우에 생성되는 쿼리의 결과값을 받아오는 버그 존재.
    node 환경인데 Safari만 문제가 생긴다.

    [실행 결과]
    Chrome :: request baseID : 35 | sql result baseID : 34
    Safari :: request baseID : 35 | sql result baseID : 65