export interface UsersFilterInterface {
    userName?: string;
    email?: string;
    country?: string;
    groups?: 1 | 2;
    pageSize?: number;
    pageNumber?: number; 
  }

  export interface ApiResponseForUser {
    data: UsersListResponse[];
    totalNumberOfPages: number;
    totalNumberOfRecords: number; 
  }
  
  export interface UsersListResponse {
    id: number;
    userName: string;
    isActivated: boolean;
    phoneNumber: string;
    email: string;
    creationDate: string;
    country: string;
      imagePath?: string;
      group: {
        name: string;
      };
    }
  
 
  export interface ViewUserProps {
    handleClose: () => void;
    userId: number|null;
  }
  
  export interface UserSelectorType {
    id: number;
    userName: string;
  }
  
export  interface UsersContextType {
    users: UsersListResponse[];
  }

  export interface UserSelector {
    id: number;
    userName: string;
  }