import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateMessageInput = {
  body: Scalars['String'];
};

export type FollowerInput = {
  username: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  followUser: User;
  login: Token;
  register: User;
  unfollowUser: User;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationFollowUserArgs = {
  input: FollowerInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationUnfollowUserArgs = {
  input: FollowerInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  messages: Array<Message>;
  users: Array<User>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['ID'];
  followers: UserFollowers;
  following: UserFollowers;
  id: Scalars['ID'];
  username: Scalars['ID'];
};

export type UserFollowers = {
  __typename?: 'UserFollowers';
  count: Scalars['Float'];
  items: Array<User>;
};

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', username: string, email: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', token: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, email: string, following: { __typename?: 'UserFollowers', count: number, items: Array<{ __typename?: 'User', username: string }> } } };


export const RegisterUserDocument = `
    mutation RegisterUser($input: RegisterUserInput!) {
  register(input: $input) {
    username
    email
  }
}
    `;
export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>) =>
    useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      ['RegisterUser'],
      (variables?: RegisterUserMutationVariables) => process.env.NEXT_PUBLIC_ENDPOINT<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, variables)(),
      options
    );
export const LoginDocument = `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => process.env.NEXT_PUBLIC_ENDPOINT<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    id
    username
    email
    following {
      count
      items {
        username
      }
    }
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      process.env.NEXT_PUBLIC_ENDPOINT<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );