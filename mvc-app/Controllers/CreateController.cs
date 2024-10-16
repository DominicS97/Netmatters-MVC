using Microsoft.AspNetCore.Mvc;

namespace mvc_app.Controllers
{
    public class CreateController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
