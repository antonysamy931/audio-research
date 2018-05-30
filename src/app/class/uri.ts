export class Uri {
    public LoginUri : string = "/api/v1/auth/login";
    public LogoutUri : string = "/api/v1/auth/logout";

    public GetAllCustomers: string = "/api/v1/customer/getallcustomers";
    public GetCustomer: string = "/api/v1/customer/getcustomer";
    public GetCustomers: string = "/api/v1/customer/getcustomers";
    public CreateCustomer: string = "/api/v1/customer/create";
    public UpdateCustomer: string = "/api/v1/customer/updatecustomer";
    public DeleteCustomer: string = "/api/v1/customer/deletecustomer";
    public IsCustomerExist: string = "/api/v1/customer/iscustomerexist";

    public GetAllBranches: string = "/api/v1/branch/getallbranches";
    public GetCustomerBranches: string = "/api/v1/branch/getcustomerbranches";
    public CreateBranch: string = "/api/v1/branch/create";
    public GetBrach: string = "/api/v1/branch/getbranchbyid";
    public UpdateBranch: string = "/api/v1/branch/updatebranch";
    public DeleteBranch: string = "/api/v1/branch/deletebranch";
    public IsBranchExist: string = "/api/v1/branch/isbranchexist";

    public AddBranchUser: string ="/api/v1/user/addnewuser";
    public GetBranchUsers: string = "/api/v1/user/getbranchusers";
    public GetUserById: string = "/api/v1/user/getuserbyid";
    public UpdateUser: string = "/api/v1/user/updateuser";
    public IsUserExistForCustomer: string = "/api/v1/user/isuserexistforcustomer";
    public IsUserExistForCustomer_UpdateRequest: string = "/api/v1/user/updateusernameexistforcustomer";

    public InsertAudio: string = "/api/v1/play/upload";
    public GetAudioByBranch: string = "/api/v1/play/getfilebybranch";

    public AddCustomerUser: string = "/api/v1/user/addnewuser";
    public GetCustomerUsers: string = "/api/v1/user/getcustomersusers";
    public UpdateCustomerUser: string = "/api/v1/user/updateuser";

    public GetCustomerGroups: string = "/api/v1/group/getgroups";
    public InsertCustomerGroup: string = "/api/v1/group/insertgroup";
    public DeleteCustomerGroup: string = "/api/v1/group/deletegroup";
    public DeleteCustomerGroupBranch: string = "/api/v1/group/deletebranchforgroup";
    public CustomerGroupNameExist: string = "/api/v1/group/groupnameexit";
    public CustomerGroupNameExistUpdate: string = "/api/v1/group/groupnameexistupdate";
    public CustomerGroupAddBranch: string = "/api/v1/group/addbranchtogroup";
    public GetCustomerMappedBranches: string = "/api/v1/group/getcustomermappedbranches";
    public GetGroupMappedBranches: string = "/api/v1/group/getgroupmappedbranches";
}
