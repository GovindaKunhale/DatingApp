using System;

namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dbo)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);

        var age = today.Year - dbo.Year;

        if (dbo > today.AddYears(-age)) age--;

        return age;
    }

}
