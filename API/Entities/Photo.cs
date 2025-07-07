using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public bool IsMain { get; set; } = false;
        public string? PublicId { get; set; } // Used for cloud storage

        //Navigation property   //required one-to-many relationship
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; } = null!; // Required, so we initialize it to null!
    }
}