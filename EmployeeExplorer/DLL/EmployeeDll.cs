using Entities;
using System.Data;
using System.Data.SqlClient;

namespace DLL
{
    public class EmployeeDll
    {
        private readonly string _connectionString;

        public EmployeeDll(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Employee> SearchEmployee(string search, int maxSearchResult, int page)
        {
            var employees = new List<Employee>();
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = "SearchEmployees";
                    command.Parameters.AddWithValue("@SearchText", search);
                    command.Parameters.AddWithValue("@MaxResults", maxSearchResult);
                    command.Parameters.AddWithValue("@Page", page);

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            employees.Add(new Employee
                            {
                                Guid = reader.GetGuid("GUID"),
                                FirstName = reader.IsDBNull("FirstName") ? "" : reader.GetString("FirstName"),
                                LastName = reader.IsDBNull("LastName") ? "" : reader.GetString("LastName"),
                                WorkTitle = reader.IsDBNull("Role") ? "" : reader.GetString("Role"),
                                ImageUrl = reader.IsDBNull("ImageUrl") ? null : reader.GetString("ImageUrl")
                            });
                        }
                    }
                }
                connection.Close();
            }
            return employees;
        }
    }
}