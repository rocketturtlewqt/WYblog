

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;

@WebServlet("/LoginOrRegister")
public class LoginOrRegister extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ArrayList<String> arr=new ArrayList<String>();
        String[] inf={"username","password","img","sex","name","birth","company","position","degree","school","industry","introduction"};
        for(int i=0;i<inf.length;i++)
            inf[i]=req.getParameter(inf[i]);
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        String submit=req.getParameter("submit");
        Connection conn=ConnectToDatabase.connnectToDatabase();
        Statement st=null;
        try{
            st=conn.createStatement();
            if(submit == null){
                System.out.println("进入验证用户名");
                PreparedStatement statement;
                ResultSet rs;
                resp.setContentType("text/html;charset=utf-8");
                PrintWriter out = resp.getWriter();
                statement = conn.prepareStatement("select * from user where username=?");
                statement.setString(1,inf[0]);
                rs = statement.executeQuery();
                if(rs.isBeforeFirst()){
                    System.out.println("用户名存在");
                    out.print("用户名已存在");
                }
                else {
                    System.out.println("用户名不存在");
                    out.print("用户名不存在");
                }
                statement.close();
            }
            else if (submit.equals("登录")){
                System.out.println("进入登录模块");
                ResultSet rs=st.executeQuery("select password from user where username='"+inf[0]+"'");
                if(rs.next()){
                    System.out.println("进入");
                    if(rs.getString(1).equals(inf[1])){
                        rs=st.executeQuery("select * from user where username='"+inf[0]+"'");
                        rs.next();
                        int len=rs.getMetaData().getColumnCount();
                        for(int i=1;i<=len;i++){
                            if(i==2||i==3) continue;
                            arr.add(rs.getString(i));
                        }
                        String str=JsonString.toUser(arr);
                        rs.close();
                        conn.close();
                        resp.getWriter().write(str);
                    }
                    else{
                        resp.getWriter().write("密码错误");
                    }
                }else{
                    resp.getWriter().write("用户名不存在");
                }
            }else if(submit.equals("注册")){
                System.out.println("进入注册模块");
                PreparedStatement statement;
                statement = conn.prepareStatement("insert into user values(?,?,?,?,?,?,?,?,?,?,?,?)");
                for(int i=0;i<inf.length;i++)
                    statement.setString(i+1,inf[i]);
                statement.executeUpdate();
                statement.close();
                resp.sendRedirect("page/login.html");
            }
            st.close();
            conn.close();
        }catch(Exception e){
            System.out.println("处理出了问题");
        }
    }
}
