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
import java.util.Collection;
@WebServlet("/PerfectData")
public class PerfectData extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ArrayList<String> arr=new ArrayList<String>();
        String[] inf={"username","password","img","sex","name","birth","company","position","degree","school","industry","introduction"};
        String way=req.getParameter("way");
        resp.setCharacterEncoding("utf-8");
        Connection conn= ConnectToDatabase.connnectToDatabase();
        Statement st=null;
        try{
            st=conn.createStatement();
            if (way.equals("确认")){
                for(int i=0;i<inf.length;i++){
                    inf[i]=req.getParameter(inf[i]);
                    if(i==1||i==2) continue;
                    arr.add(inf[i]);
                }
                String str="";
                ResultSet rs=st.executeQuery("select password from user where username='"+inf[0]+"'");
                rs.last();
                inf[1]=rs.getString(1);
                for(int i=0;i<inf.length;i++){
                    if(i==inf.length) str+=inf[i];
                    else str+=inf[i]+",";
                }
                str=StringTransfer.stringTransfer(str);
                st.executeUpdate("delete from user where username='"+inf[0]+"'");
                st.executeUpdate("insert into user values("+str+")");
                rs.close();
                str=JsonString.toUser(arr);
                System.out.println(str);
                resp.getWriter().write(str);
            }
            st.close();
            conn.close();
        }catch (Exception e){
            System.out.println("处理出错");
        }
    }
}
