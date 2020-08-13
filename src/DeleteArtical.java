import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;
@WebServlet("/DeleteArtical")
public class DeleteArtical extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id=req.getParameter("id");
        Connection conn=ConnectToDatabase.connnectToDatabase();
        Statement st=null;
        try{
            st=conn.createStatement();
            System.out.println("开始执行");
            st.executeUpdate("delete from artical where id="+id);
            System.out.println("成功执行");
            resp.getWriter().write("success");
        }catch (Exception e){
            System.out.println("服务端处理出错");
        }
    }
}
