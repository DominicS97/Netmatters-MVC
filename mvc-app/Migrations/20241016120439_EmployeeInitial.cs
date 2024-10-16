using Microsoft.EntityFrameworkCore.Migrations;


#nullable disable

namespace mvc_app.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    company = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(16)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
