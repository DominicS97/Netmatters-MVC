using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace mvc_app.Models
{
    public class Employee
    {
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string email { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string firstName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string lastName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string company { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string phone { get; set; }
    }
}