import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

@WebServlet("/GetArtical")
public class GetArtical extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String id = req.getParameter("id");
        System.out.println("username:"+username);
        System.out.println("id:"+id);
        ArrayList<String> articalList = new ArrayList<String>();
        Connection conn=ConnectToDatabase.connnectToDatabase();
        PreparedStatement statement;
        try{
            if (username!=null){
                statement = conn.prepareStatement("select * from artical where username=?");
                statement.setString(1,username);
                ResultSet rs = statement.executeQuery();
                while(rs.next()){
                    articalList.add(rs.getString("id"));
                    articalList.add(rs.getString("username"));
                    articalList.add(rs.getString("title"));
                    articalList.add(rs.getString("content"));
                    articalList.add(rs.getString("time"));
                }
                rs.close();
                statement.close();
                conn.close();
                String jsonArtical = JsonString.toArticalList(articalList);
                resp.setCharacterEncoding("utf-8");
                resp.getWriter().write(jsonArtical);
            } else if(id!=null) {
                System.out.println("id:"+id);
                System.out.println("aaaaaa");
                System.out.println("进入id处理");
                statement = conn.prepareStatement("select * from artical where id=?");
                statement.setString(1,id);
                System.out.println("写完查询语句");
                ResultSet rs = statement.executeQuery();
                System.out.println("进入循环");
                while(rs.next()){
                    articalList.add(rs.getString("id"));
                    articalList.add(rs.getString("username"));
                    articalList.add(rs.getString("title"));
                    articalList.add(rs.getString("content"));
                    articalList.add(rs.getString("time"));
                }
                conn.close();
                System.out.println("出循环");
                String jsonArtical = JsonString.toArtical(articalList);
                System.out.println(jsonArtical);
                resp.setCharacterEncoding("utf-8");
                resp.getWriter().write(jsonArtical);
                System.out.println("打印");
            } else{
                System.out.println("进入blogindex");
                statement = conn.prepareStatement("select * from artical");
                ResultSet rs = statement.executeQuery();
                System.out.println("成功执行");
                while(rs.next()){
                    articalList.add(rs.getString("id"));
                    articalList.add(rs.getString("username"));
                    articalList.add(rs.getString("title"));
                    articalList.add(rs.getString("content"));
                    articalList.add(rs.getString("time"));
                }
                rs.close();
                statement.close();
                conn.close();
                String jsonArtical = JsonString.toArticalList(articalList);
                System.out.println(jsonArtical);
                resp.setCharacterEncoding("utf-8");
                resp.getWriter().write(jsonArtical);
            }
        }catch(Exception e){
            System.out.println("处理出了问题");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
