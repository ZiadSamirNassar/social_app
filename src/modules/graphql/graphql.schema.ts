import { 
    GraphQLID, 
    GraphQLList, 
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLString, 
    GraphQLOutputType 
} from "graphql";
import { UserRepository, PostRepository, CommentRepository } from "../../DB";
import { ObjectId } from "mongoose";


const userRepo = new UserRepository()
const postRepo = new PostRepository()
const commentRepo = new CommentRepository()



const UserType: GraphQLOutputType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        friends: { type: new GraphQLList(UserType) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const ReactionType: GraphQLOutputType = new GraphQLObjectType({
    name: "Reaction",
    fields: () => ({
        userId: { type: GraphQLString },
    })
})

const PostType: GraphQLOutputType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        user: { type: UserType, resolve: (post) => {
            return userRepo.findOne({_id: post.userId as ObjectId},{},{populate: "friends"})
        } },
        comments: { type: new GraphQLList(commentType), resolve: (post) => {
            return commentRepo.find({postId: post._id})
        } },
        reactions: { type: new GraphQLList(ReactionType) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const commentType: GraphQLOutputType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        content: { type: GraphQLString },
        reactions: { type: new GraphQLList(ReactionType) },
        user: { type: UserType, resolve: (comment) => {
            return userRepo.findOne({_id: comment.userId as ObjectId},{},{populate: "friends"})
        } },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
})

const query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({

        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (_, args) => {
                if (!args.id) {
                    throw new Error("id is required");
                }
                return userRepo.findOne({_id: args.id as ObjectId},{},{populate: "friends"})}
        },

        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID }
            },

            resolve: (_, args) => {
                if (!args.id) {
                    throw new Error("id is required");
                }
                return postRepo.findOne({_id: args.id as ObjectId})}
        },


        comment: {
            type: commentType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (_, args) => {
                if (!args.id) {
                    throw new Error("id is required");
                }
                return commentRepo.findOne({_id: args.id as ObjectId})}
        },
        
    })
})

export const schema = new GraphQLSchema({

    query
    
})