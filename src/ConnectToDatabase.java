import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectToDatabase {
    public static Connection connnectToDatabase(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("成功加载驱动类");
        }catch(ClassNotFoundException e) {
            System.out.println("加载驱动类失败");
        }
        String url="jdbc:mysql://cdb-9pnb8l3f.gz.tencentcdb.com:10152/experiment";
        Connection conn=null;
        try{
            conn=(Connection) DriverManager.getConnection(url,"root","wqt000113");
            System.out.println("连接数据库成功");
        }catch (Exception e){
            System.out.println("连接数据库失败");
        }
        return conn;
    }
}
