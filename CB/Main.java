import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;

public class Main 
{

    static BufferedReader reader;
    static FileWriter valid;
    static FileWriter allRecords;
    static HashSet<String> set=new HashSet<String>();  
    
    public static void main(String []args){
        readFile();
    }
    public static void readFile() {
        
        
        try {

            valid = new FileWriter("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\Valid.txt",true);
            allRecords = new FileWriter("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\AllRecords.txt",true); 
            reader = new BufferedReader(new FileReader("C:\\Users\\csmal\\Desktop\\Desktop\\SampleFile_TTS.txt"));
            String heading = "Transaction Reference ID" + "," + "Date" + "," + "Payer Name" + "," + "Payer Account Number" + "," + "Payee Name" + "," + "Payee Account Number" + "," + "Amount" + "," + "Validity";
            String line = reader.readLine();
            allRecords.write(heading);
            allRecords.write(System.getProperty( "line.separator" ));
            valid.write(heading);
            valid.write(System.getProperty( "line.separator" ));
            while (line != null) 
            {
                if(line.length()<127)
                    check(line,line.length());
                else
                    process(line);
                line = reader.readLine();
                
            }
            reader.close();
            valid.close();
            allRecords.close();
        } 
        catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void check(String str , int length) throws IOException
    {
        String temp = null;
        if(length<12)
            temp = str.substring(0,length) + "," + " "+ "," + " "+ "," + " "+ "," + " "+ "," + " "+ "," + " "+ ","+ "invalid";
        
        else if(length<20)
            temp = str.substring(0,12) + "," + str.substring(12,length)+ "," + " "+ "," + " "+ "," + " "+ "," + " "+ "," + " "+ ","+ "invalid";

        else if(length<55)
            temp = str.substring(0,12) + "," + str.substring(12,20)+ "," + str.substring(20,length)+ "," + " "+ "," + " "+ "," + " "+ "," + " "+ ","+ "invalid";

        else if(length<67)
            temp = str.substring(0,12) + "," + str.substring(12,20)+ "," + str.substring(20,55)+ "," + str.substring(55,length)+ "," + " "+ "," + " "+ "," + " "+ ","+ "invalid";

        else if(length<102)
            temp = str.substring(0,12) + "," + str.substring(12,20)+ "," + str.substring(20,55)+ "," + str.substring(55,67)+ "," + str.substring(67,length)+ "," + " "+ "," + " "+ ","+ "invalid";

        else if(length<114)
            temp = str.substring(0,12) + "," + str.substring(12,20)+ "," + str.substring(20,55)+ "," + str.substring(55,67)+ "," + str.substring(67,102)+ "," + str.substring(102,length)+ "," + " "+ ","+ "invalid";

        else if(length<127)
            temp = str.substring(0,12) + "," + str.substring(12,20)+ "," + str.substring(20,55)+ "," + str.substring(55,67)+ "," + str.substring(67,102)+ "," + str.substring(102,114)+ "," + str.substring(114,length)+ ","+ "invalid";
    
        allRecords.write(temp);
        allRecords.write(System.getProperty( "line.separator" ));

    }
    
     public static void process(String str) throws IOException
    {
        int flag=0;
        String substr= str.substring(0,12);
        //System.out.println(str.substring(20,55)+".................");
        String elementsValid = str.substring(0,12)+"," + str.substring(12,20)+","+ str.substring(20,55)+","+str.substring(55,67)+","+str.substring(67,102)+","+ str.substring(102,114)+","+ str.substring(114,127) + ","+"valid";
        String elementsInvalid = str.substring(0,12)+"," + str.substring(12,20)+","+ str.substring(20,55)+","+str.substring(55,67)+","+str.substring(67,102)+","+ str.substring(102,114)+","+ str.substring(114,127) + ","+"invalid";
        if(!set.contains(substr))
        {
            if(!PName(str,0,1))
                flag=1;   
            else if(!Date(str,12))       
                flag=1;    
            else if(!PName(str,20,0)) 
                flag=1;
            else if(!PName(str,55,1))
                flag=1;
            else if(!PName(str,67,0)) 
                flag=1;
            else if(!PName(str,102,1))
                flag=1;
            else if(!Amount(str,114))
                flag=1;
    
            if(flag==0)
             {
                set.add(substr);
                //write into valid csv 
                allRecords.write(elementsValid);
                allRecords.write(System.getProperty( "line.separator" ));
                valid.write(elementsValid);
                valid.write(System.getProperty( "line.separator" ));
                return ;
             }

             //write into invalid file
             allRecords.write(elementsInvalid);
             allRecords.write(System.getProperty( "line.separator" ));
            
            }
        else 
            //write into invalid file
             allRecords.write(elementsInvalid);
             allRecords.write(System.getProperty( "line.separator" ));          
    }//end
    
    public static boolean Date(String str, int q)
    {
        try {
            if(str.substring(q,q+8).equalsIgnoreCase(new SimpleDateFormat("ddMMyyyy").format(new Date())))
                return true;
            else
                return false;
        }
        catch(Exception e)
        {
            return false;
        }
    }

    public static boolean PName(String line,int q , int isTrID)
    {   
        String substr;
        int i=0;
        if(isTrID == 1)
        {
            substr = line.substring(q,q+12);
            while(i<12)
            {
                if(Character.isLetter(substr.charAt(i)) || Character.isDigit(substr.charAt(i)) || substr.charAt(i) == ' ') 
                     ++i; 
                else
                {
                   return false;
                }
             }
        }
        else
        {
            substr=line.substring(q,q+35);
             while(i<35)
            {
                if(Character.isLetter(substr.charAt(i)) || Character.isDigit(substr.charAt(i)) || substr.charAt(i) == ' ') 
                     ++i;  
                else
                {
                   return false;
                }
             }
         }
   
        return true;
}//end


   public static boolean Amount(String line, int q)
    {
        String substr=line.substring(q,q+13);
        int i=0;
        try 
        {
            while(i<13)
            {
                if(!Character.isDigit(substr.charAt(i)) && substr.charAt(i)!='.' && substr.charAt(i)!=' ')
                    return false;
                i++;
            }
            return true;

        }
        catch(Exception e)
        {
            return false;
        }
}//end

}
      