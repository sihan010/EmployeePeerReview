## Report

**Running the application:**
**_Environment Setup_**

The application was built with ASP.NET Core 3.1 and React.JS so your system needs to have .NET Core SDK 3.1 and node.js installed.
Get them from here-

- https://dotnet.microsoft.com/download/dotnet-core/3.1
- https://nodejs.org/en/download/

For IDE, Make Sure Visual Studio is Installed. Get it from here -

- https://visualstudio.microsoft.com/vs/community/

For Database Microsoft SQL Server was used. Get it for free-

- https://www.microsoft.com/en-us/sql-server/sql-server-downloads

For Database Management you can get SQL Server Management Studio-

- https://aka.ms/ssmsfullsetup

**_Project Setup_**

- Create an empty database and note the connection string.
  Connection String format -
  "Server=myServerAddress;Database=myDataBaseName;User Id=myUsername;Password=myPassword;"
- Clone the project and open it with Visual Studio, or double click "EmployeePeerReview.csproj"
- Open appsettings.json and replace ConnectionString.EmployeeDB entry with your Connection String
- Open Package Manager Console from Tools>NuGet Package Manager>Package Manager Console
- Run "Update-Database" command
- Run the project (1st run will take some time)
- Note down the launch URL and replace "host" variable in react frontend.
  Path: client\src\helper\ApiCall.js

**Library Choices:**

Core frontend library used in this project is React.JS
Besides I have used 1 more libraries -

- Material UI:
  Material UI is used as the core component library. I have chosen to use Material UI for the sake of saving time and maintain design consistency across the project. Material UI theming and styling system, Main CSS to override existing styles were also used.
