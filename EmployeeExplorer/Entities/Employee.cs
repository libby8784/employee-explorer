namespace Entities
{
    public class Employee
    {
        public Guid Guid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string WorkTitle { get; set; }
        public string? ImageUrl { get; set; }
    }
}