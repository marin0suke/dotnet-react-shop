
using AutoMapper;
using DotnetReactShop.Models;
using DotnetReactShop.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Order, OrderDto>(); // retrieving existing order (back to front)

        CreateMap<OrderItem, OrderItemDto>(); // retrieving existing order (back to front)

        CreateMap<OrderSubmissionDto, Order>(); // submitting order. (front to back)

        CreateMap<OrderItemDto, OrderItem>(); // to convert items on submission. (front to back)

        CreateMap<UpdateOrderDto, Order>(); // updating (front to back)

        CreateMap<ApplicationUser, LoginResponseDto>()
            .IncludeBase<ApplicationUser, UserDto>() // this way we will only map the token.
            .ForMember(dest => dest.Token, opt => opt.Ignore()); // mapping user to login response dto

        CreateMap<ApplicationUser, UserDto>(); // for everywhere we need to return user info.
 
    }
}