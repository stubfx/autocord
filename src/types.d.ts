declare type PartialGuild = {
    "id": string //"80351110224678912",
    "name": string //"1337 Krew",
    "icon": string //"8342729096ea3675442027381ff50dfe",
    "owner": boolean //true,
    "permissions": string //"36953089",
    "features": Array<string> //["COMMUNITY", "NEWS"]
}

declare type UserObject = {
    id:	string//	the user's id	identify
    username:	string//	the user's username, not unique across the platform	identify
    discriminator:	string//	the user's 4-digit discord-tag	identify
    avatar:	string|null //	the user's avatar hash	identify
    bot?:	boolean|null//	whether the user belongs to an OAuth2 application	identify
    system?:	boolean|null//	whether the user is an Official Discord System user (part of the urgent message system)	identify
    mfa_enabled?:	boolean|null//	whether the user has two factor enabled on their account	identify
    banner?:	string|null//	the user's banner hash	identify
    "accent_color":	number|null//	the user's banner color encoded as an integer representation of hexadecimal color code	identify
    locale?:	string//	the user's chosen language option	identify
    verified?:	boolean//	whether the email on this account has been verified	email
    email?:	string|null//	the user's email	email
    flags:	number|null//	the flags on a user's account	identify
    premium_type:	number|null//	the type of Nitro subscription on a user's account	identify
    public_flags:	number|null//	the public flags on a user's account	identify
}