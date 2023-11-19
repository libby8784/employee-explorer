using DLL;
using Entities;

namespace BLL
{
    public class EmployeeBll
    {
        private static EmployeeDll employeeDll;//TODO add match interface, change to DI 

        public EmployeeBll()
        {
            //TODO: take connection string from configs
            var connectionString = "Data Source=localhost;Initial Catalog=EmployeesExplorer;Integrated Security=True;";
            employeeDll = new(connectionString);
        }

        private bool IsValidSearch(string search, int page)
        {
            //TODO: return error message to client
            return search?.Length <= 100 && page >= 0;
        }

        public List<Employee> SearchEmployee(string search, int page)
        {
            if (this.IsValidSearch(search, page))
            {
                var maxSearchResults = 20; //TODO: take maxEmployeesSearchResults from settings

                return employeeDll.SearchEmployee(search, maxSearchResults, page);
            }

            return new List<Employee>();
        }
    }
}