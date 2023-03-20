const discordPermissions = [
  { 
    name: 'CREATE_INSTANT_INVITE',
    permissionDecimal: 1,
    description: 'Allows creation of instant invites	T, V, S'
  },
  { 
    name: 'KICK_MEMBERS',
    permissionDecimal: 2,
    description: 'Allows kicking members	'
  },
  { 
    name: 'BAN_MEMBERS',
    permissionDecimal: 4,
    description: 'Allows banning members	'
  },
  { 
    name: 'ADMINISTRATOR',
    permissionDecimal: 8,
    description: 'Allows all permissions and bypasses channel permission overwrites	'
  },
  { 
    name: 'MANAGE_CHANNELS',
    permissionDecimal: 16,
    description: 'Allows management and editing of channels	T, V, S'
  },
  { 
    name: 'MANAGE_GUILD',
    permissionDecimal: 32,
    description: 'Allows management and editing of the guild	'
  },
  { 
    name: 'ADD_REACTIONS',
    permissionDecimal: 64,
    description: 'Allows for the addition of reactions to messages	T, V, S'
  },
  { 
    name: 'VIEW_AUDIT_LOG',
    permissionDecimal: 128,
    description: 'Allows for viewing of audit logs	'
  },
  { 
    name: 'PRIORITY_SPEAKER',
    permissionDecimal: 256,
    description: 'Allows for using priority speaker in a voice channel	V'
  },
  { 
    name: 'STREAM',
    permissionDecimal: 512,
    description: 'Allows the user to go live	V, S'
  },
  { 
    name: 'VIEW_CHANNEL',
    permissionDecimal: 1024,
    description: 'Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels	T, V, S'
  },
  { 
    name: 'SEND_MESSAGES',
    permissionDecimal: 2048,
    description: 'Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads)	T, V, S'
  },
  { 
    name: 'SEND_TTS_MESSAGES',
    permissionDecimal: 4096,
    description: 'Allows for sending of /tts messages	T, V, S'
  },
  { 
    name: 'MANAGE_MESSAGES',
    permissionDecimal: 8192,
    description: 'Allows for deletion of other users messages	T, V, S'
  },
  { 
    name: 'EMBED_LINKS',
    permissionDecimal: 16384,
    description: 'Links sent by users with this permission will be auto-embedded	T, V, S'
  },
  { 
    name: 'ATTACH_FILES',
    permissionDecimal: 32768,
    description: 'Allows for uploading images and files	T, V, S'
  },
  { 
    name: 'READ_MESSAGE_HISTORY',
    permissionDecimal: 65536,
    description: 'Allows for reading of message history	T, V, S'
  },
  { 
    name: 'MENTION_EVERYONE',
    permissionDecimal: 131072,
    description: 'Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel	T, V, S'
  },
  { 
    name: 'USE_EXTERNAL_EMOJIS',
    permissionDecimal: 262144,
    description: 'Allows the usage of custom emojis from other servers	T, V, S'
  },
  { 
    name: 'VIEW_GUILD_INSIGHTS',
    permissionDecimal: 524288,
    description: 'Allows for viewing guild insights	'
  },
  { 
    name: 'CONNECT',
    permissionDecimal: 1048576,
    description: 'Allows for joining of a voice channel	V, S'
  },
  { 
    name: 'SPEAK',
    permissionDecimal: 2097152,
    description: 'Allows for speaking in a voice channel	V'
  },
  { 
    name: 'MUTE_MEMBERS',
    permissionDecimal: 4194304,
    description: 'Allows for muting members in a voice channel	V, S'
  },
  { 
    name: 'DEAFEN_MEMBERS',
    permissionDecimal: 8388608,
    description: 'Allows for deafening of members in a voice channel	V'
  },
  { 
    name: 'MOVE_MEMBERS',
    permissionDecimal: 16777216,
    description: 'Allows for moving of members between voice channels	V, S'
  },
  { 
    name: 'USE_VAD',
    permissionDecimal: 33554432,
    description: 'Allows for using voice-activity-detection in a voice channel	V'
  },
  { 
    name: 'CHANGE_NICKNAME',
    permissionDecimal: 67108864,
    description: 'Allows for modification of own nickname	'
  },
  { 
    name: 'MANAGE_NICKNAMES',
    permissionDecimal: 134217728,
    description: 'Allows for modification of other users nicknames	'
  },
  { 
    name: 'MANAGE_ROLES',
    permissionDecimal: 268435456,
    description: 'Allows management and editing of roles	T, V, S'
  },
  { 
    name: 'MANAGE_WEBHOOKS',
    permissionDecimal: 536870912,
    description: 'Allows management and editing of webhooks	T, V, S'
  },
  { 
    name: 'MANAGE_EMOJIS_AND_STICKERS',
    permissionDecimal: 1073741824,
    description: 'Allows management and editing of emojis and stickers	'
  },
  { 
    name: 'USE_APPLICATION_COMMANDS',
    permissionDecimal: 2147483648,
    description: 'Allows members to use application commands, including slash commands and context menu commands.	T, V, S'
  },
  { 
    name: 'REQUEST_TO_SPEAK',
    permissionDecimal: 4294967296,
    description: 'Allows for requesting to speak in stage channels. (This permission is under active development and may be changed or removed.)	S'
  },
  { 
    name: 'MANAGE_EVENTS',
    permissionDecimal: 8589934592,
    description: 'Allows for creating, editing, and deleting scheduled events	V, S'
  },
  { 
    name: 'MANAGE_THREADS',
    permissionDecimal: 17179869184,
    description: 'Allows for deleting and archiving threads, and viewing all private threads	T'
  },
  { 
    name: 'CREATE_PUBLIC_THREADS',
    permissionDecimal: 34359738368,
    description: 'Allows for creating public and announcement threads	T'
  },
  { 
    name: 'CREATE_PRIVATE_THREADS',
    permissionDecimal: 68719476736,
    description: 'Allows for creating private threads	T'
  },
  { 
    name: 'USE_EXTERNAL_STICKERS',
    permissionDecimal: 137438953472,
    description: 'Allows the usage of custom stickers from other servers	T, V, S'
  },
  { 
    name: 'SEND_MESSAGES_IN_THREADS',
    permissionDecimal: 274877906944,
    description: 'Allows for sending messages in threads	T'
  },
  { 
    name: 'USE_EMBEDDED_ACTIVITIES',
    permissionDecimal: 549755813888,
    description: 'Allows for using Activities (applications with the EMBEDDED flag) in a voice channel	V'
  },
  { 
    name: 'MODERATE_MEMBERS',
    permissionDecimal: 1099511627776,
    description: 'Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels'
  },
]

export function getPermissionsFromDecimal(decimal) {
  return discordPermissions.filter((permission) => decimal & permission.permissionDecimal);
}
export function getPermissionFromDecimal(decimal) {
  for (const permission of discordPermissions) {
    if (decimal & permission.permissionDecimal) {
      return permission;
    }
  }
  return null;
}
