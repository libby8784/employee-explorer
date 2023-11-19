using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class EmployeesSearchResult
    {
        public bool HasError { get; set; }
        public string? ErrorMessage { get; set; }
        public int TotalPages { get; set; }
        public List<Employee> employees { get; set; }
    }
}

