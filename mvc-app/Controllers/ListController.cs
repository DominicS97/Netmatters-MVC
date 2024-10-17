using Microsoft.AspNetCore.Mvc;

namespace mvc_app.Controllers
{
    public class ListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
