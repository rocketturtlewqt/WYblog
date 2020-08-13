import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
@WebServlet("/SearchArtical")
public class SearchArtical extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String keyword=req.getParameter("keyword");
        ArrayList<String> arr=new ArrayList<String>();
        Connection conn=ConnectToDatabase.connnectToDatabase();
        Statement st=null;
        try{
            st=conn.createStatement();
            ResultSet rs=st.executeQuery("select * from artical where title like('%"+keyword+"%')");
            int row=0,len=rs.getMetaData().getColumnCount();
            while(rs.next()){
                arr.add(rs.getString("id"));
                arr.add(rs.getString("username"));
                arr.add(rs.getString("title"));
                arr.add(rs.getString("content"));
                arr.add(rs.getString("time"));
                row++;
                if(row==5) break;
            }
            rs.close();
            st.close();
            conn.close();
            if(row!=0) {
                String jsonArtical=JsonString.toArticalList(arr);
                resp.setCharacterEncoding("utf-8");
                resp.getWriter().write(jsonArtical);
            }
        }catch (Exception e){
            System.out.println("服务端处理出错");
        }
    }
}
