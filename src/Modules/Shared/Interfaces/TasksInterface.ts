export interface ITask {
      id: number,
      title: string,
      description: string,
      status: string,
      creationDate: string,
      modificationDate: string,
      employee: {
        id: number,
        userName: string,
      },

      project: {
        id: number,
        title: string,
      }

  }


