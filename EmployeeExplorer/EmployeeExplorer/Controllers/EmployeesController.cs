using BLL;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeExplorer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {

        private readonly EmployeeBll employeeBll = new(); //TODO USE DI.
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        //TODO: make it async
        public ActionResult<List<Employee>> SearchEmployees(string searchTerm, int page = 0)
        {
            var employees = employeeBll.SearchEmployee(searchTerm, page);
            return Ok(employees);
        }
    }
}