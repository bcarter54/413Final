using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _413Final.API.Data;

public class Entertainer
{
    [Key]
    public int EntertainerID { get; set; }
    [Required]
    public string EntStageName { get; set; }
    public string? EntSSN { get; set; }
    public string? EntStreetAddress { get; set; }
    public string? EntCity { get; set; }
    public string? EntState { get; set; }
    public int? EntZipCode { get; set; }
    public string? EntPhoneNumber { get; set; }
    public string? EntWebPage { get; set; }
    public string? EntEMailAddress { get; set; }
    public string? DateEntered { get; set; }
    
    [NotMapped]
    public int? BookingCount { get; set; }
}