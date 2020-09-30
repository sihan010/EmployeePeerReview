using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeePeerReview.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    EmployeeType = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Position = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: false),
                    Month = table.Column<string>(nullable: false),
                    Date = table.Column<string>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Peers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: false),
                    ReviewId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Peers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Peers_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Peers_Reviews_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "Reviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Email", "EmployeeType", "Name", "Password", "Position" },
                values: new object[] { 1, "admin@paypay.com", "Admin", "Bob", "VOQYMwbMqOE/DhYDfrOantcYmYMHU4t3jVMHw0CqOgv8/Lrylx9SxJZZYMLJHc8Olu8qXw8t/8k=", "Manager" });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Email", "EmployeeType", "Name", "Password", "Position" },
                values: new object[] { 2, "user@paypay.com", "General", "John", "QtwpA1qdZa4nnx6qBhNGOAWT2f5LikgU9/ltpwnwJQErf6jIKSlfpwZKU20DpjSVOCnKkSs5bRc=", "Developer" });

            migrationBuilder.CreateIndex(
                name: "IX_Peers_EmployeeId",
                table: "Peers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Peers_ReviewId",
                table: "Peers",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_EmployeeId",
                table: "Reviews",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Peers");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
