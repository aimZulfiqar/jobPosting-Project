import { gql } from "@apollo/client";

export const ADD_JOB = gql`
    mutation postJob($input: PostJobInput!) {
      postJob(input: $input) {
        id
        title
        slug
        description

      }
    }
  `