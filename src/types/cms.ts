import config from '../../cms.config'
import { generateContentTypes } from '@matthew-hre/cms/types'
import { z } from 'zod'

const schemas = generateContentTypes(config)

export const ProfileSchema = schemas.static.profile
export const ProjectSchema = schemas.collections.projects

export type Profile = z.infer<typeof ProfileSchema>
export type Project = z.infer<typeof ProjectSchema>
