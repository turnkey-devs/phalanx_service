import type { DeepRequired } from "@turnkeyid/utils-ts"
import { isEmpty, modelFactory } from "@turnkeyid/utils-ts"

/**
 * @deprecated this struct is deprecated, use AccessClientPrincipal please
 */
export class AccessClientPrincipalLegacy {
  constructor(
    public clientID: string,
    public appConfigID?: string,
    public clientName?: string,
  ) {}

  public isAuthenticated(): this is DeepRequired<AccessClientPrincipalLegacy> {
    return Boolean(this.clientID) || Boolean(this.appConfigID)
  }
  
  public static factory = modelFactory(AccessClientPrincipalLegacy)

  public static convertToNewVer = (access: AccessClientPrincipalLegacy) => AccessClientPrincipal.factory({
    client_id: access.clientID,
    app_id: access.appConfigID,
    client_name: access.clientName,
    environment: ``,
    expired: 0,
    scope: `PUBLIC`,
  })
}

class BaseAccessPrincipal {
  // Because we will extend it, and to avoid
  // conflict with super(), we just do it this way
  // !TODO: for now...
  public environment: string = void 0 as any
  public scope: string = void 0 as any
  public expired: number = void 0 as any/** @description Expired DateTime in MS */
}

export class AccessClientPrincipal extends BaseAccessPrincipal {
  constructor(
    public client_id: string,
    public app_id?: string,
    public client_name?: string,
  ) {
    super()
  }

  public isAuthenticated(): this is DeepRequired<AccessClientPrincipal> {
    return Boolean(this.client_id) || Boolean(this.app_id)
  }
  
  public static factory = modelFactory(AccessClientPrincipal)
}

export class AccessUserPrincipal extends BaseAccessPrincipal {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: string,
  ) {
    super()
  }

  public isAuthenticated(): this is Required<AccessUserPrincipal> {
    return Boolean(this.id) && Boolean(this.name) && Boolean(this.email) && Boolean(this.role)
  }

  public isResourceOwner(): boolean {
    throw `not Implemented`
  }

  public isInRole<T extends string>(roles: T[]): boolean {
    const currentUserRole = this?.role

    if (!currentUserRole) 
      return false

    if (typeof roles === `object`) 
      roles = Object.values(roles)

    return roles.some(role => {
      const isInRole = (Boolean(currentUserRole.includes(role)))
      return isInRole
    })
  }
  
  public static factory = modelFactory(AccessUserPrincipal)
}

export class AccessPrincipal {
  constructor(
    public client?: AccessClientPrincipal,
    public user?: AccessUserPrincipal,
    public ip?: string,
  ) {}

  static factory = modelFactory(AccessPrincipal, {})
}
