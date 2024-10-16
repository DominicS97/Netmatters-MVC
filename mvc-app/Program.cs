using Microsoft.EntityFrameworkCore;
using mvc_app.Models;

var builder = WebApplication.CreateBuilder(args);
var provider = builder.Services.BuildServiceProvider();
var _configuration = provider.GetRequiredService<IConfiguration>();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<CompanyDBContext>(options =>
options.UseSqlServer(_configuration.GetConnectionString("DevConnection")));
builder.Services.AddDbContext<EmployeeDBContext>(options =>
options.UseSqlServer(_configuration.GetConnectionString("DevConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
