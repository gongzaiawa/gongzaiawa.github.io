@ServerEndpoint("/robin")
public class ChatEndPoint {

    private static Set<ChatEndPoint> webSocketSet = new HashSet<>();

    private Session session;

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("接收的消息是：" + message);
        System.out.println(session);
        //将消息发送给其他的用户
        for (Chat chat : webSocketSet) {
            if(chat != this) {
                chat.session.getBasicRemote().sendText(message);
            }
        }
    }

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
    }

    @OnClose
    public void onClose(Session seesion) {
        System.out.println("连接关闭了。。。");
    }

    @OnError
    public void onError(Session session,Throwable error) {
        System.out.println("出错了。。。。" + error.getMessage());
    }
}
