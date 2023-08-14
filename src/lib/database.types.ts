export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      casts: {
        Row: {
          author_display_name: string | null
          author_fid: number
          author_pfp_url: string | null
          author_pfp_verified: boolean | null
          author_username: string | null
          deleted: boolean | null
          fts: unknown | null
          hash: string
          mentions: Json | null
          parent_author_fid: number | null
          parent_author_username: string | null
          parent_source: string | null
          published_at: string
          reactions_count: number | null
          recasts_count: number | null
          replies_count: number | null
          text: string
          thread_hash: string
          watches_count: number | null
        }
        Insert: {
          author_display_name?: string | null
          author_fid: number
          author_pfp_url?: string | null
          author_pfp_verified?: boolean | null
          author_username?: string | null
          deleted?: boolean | null
          fts?: unknown | null
          hash: string
          mentions?: Json | null
          parent_author_fid?: number | null
          parent_author_username?: string | null
          parent_source?: string | null
          published_at: string
          reactions_count?: number | null
          recasts_count?: number | null
          replies_count?: number | null
          text: string
          thread_hash: string
          watches_count?: number | null
        }
        Update: {
          author_display_name?: string | null
          author_fid?: number
          author_pfp_url?: string | null
          author_pfp_verified?: boolean | null
          author_username?: string | null
          deleted?: boolean | null
          fts?: unknown | null
          hash?: string
          mentions?: Json | null
          parent_author_fid?: number | null
          parent_author_username?: string | null
          parent_source?: string | null
          published_at?: string
          reactions_count?: number | null
          recasts_count?: number | null
          replies_count?: number | null
          text?: string
          thread_hash?: string
          watches_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "casts_author_fid_fkey"
            columns: ["author_fid"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casts_author_fid_fkey"
            columns: ["author_fid"]
            referencedRelation: "profile_with_verification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casts_parent_author_fid_fkey"
            columns: ["parent_author_fid"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casts_parent_author_fid_fkey"
            columns: ["parent_author_fid"]
            referencedRelation: "profile_with_verification"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          avatar_url: string | null
          avatar_verified: boolean | null
          bio: string | null
          display_name: string | null
          followers: number | null
          following: number | null
          id: number
          owner: string | null
          referrer: string | null
          registered_at: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          avatar_verified?: boolean | null
          bio?: string | null
          display_name?: string | null
          followers?: number | null
          following?: number | null
          id: number
          owner?: string | null
          referrer?: string | null
          registered_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          avatar_verified?: boolean | null
          bio?: string | null
          display_name?: string | null
          followers?: number | null
          following?: number | null
          id?: number
          owner?: string | null
          referrer?: string | null
          registered_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      verification: {
        Row: {
          address: string
          created_at: string | null
          fid: number
        }
        Insert: {
          address: string
          created_at?: string | null
          fid: number
        }
        Update: {
          address?: string
          created_at?: string | null
          fid?: number
        }
        Relationships: [
          {
            foreignKeyName: "verifications_fid_fkey"
            columns: ["fid"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_fid_fkey"
            columns: ["fid"]
            referencedRelation: "profile_with_verification"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      profile_with_verification: {
        Row: {
          avatar_url: string | null
          avatar_verified: boolean | null
          bio: string | null
          display_name: string | null
          followers: number | null
          following: number | null
          id: number | null
          owner: string | null
          referrer: string | null
          registered_at: string | null
          updated_at: string | null
          username: string | null
          verifications: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      casts_regex: {
        Args: {
          regex: string
        }
        Returns: {
          author_display_name: string | null
          author_fid: number
          author_pfp_url: string | null
          author_pfp_verified: boolean | null
          author_username: string | null
          deleted: boolean | null
          fts: unknown | null
          hash: string
          mentions: Json | null
          parent_author_fid: number | null
          parent_author_username: string | null
          parent_source: string | null
          published_at: string
          reactions_count: number | null
          recasts_count: number | null
          replies_count: number | null
          text: string
          thread_hash: string
          watches_count: number | null
        }[]
      }
      casts_regex_by_user: {
        Args: {
          regex: string
          username?: string
        }
        Returns: {
          author_display_name: string | null
          author_fid: number
          author_pfp_url: string | null
          author_pfp_verified: boolean | null
          author_username: string | null
          deleted: boolean | null
          fts: unknown | null
          hash: string
          mentions: Json | null
          parent_author_fid: number | null
          parent_author_username: string | null
          parent_source: string | null
          published_at: string
          reactions_count: number | null
          recasts_count: number | null
          replies_count: number | null
          text: string
          thread_hash: string
          watches_count: number | null
        }[]
      }
      get_profile_by_address: {
        Args: {
          connected_address: string
        }
        Returns: {
          avatar_url: string | null
          avatar_verified: boolean | null
          bio: string | null
          display_name: string | null
          followers: number | null
          following: number | null
          id: number
          owner: string | null
          referrer: string | null
          registered_at: string | null
          updated_at: string | null
          username: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

