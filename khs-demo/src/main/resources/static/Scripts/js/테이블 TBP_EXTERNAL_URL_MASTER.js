USE [VCP_CUSTOM01]
GO

/****** Object:  Table [dbo].[TBP_EXTERNAL_URL_MASTER]    Script Date: 2023-02-06 오후 2:30:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
/******************************************************************************************
테 이 블  명 : TBP_EXTERNAL_URL_MASTER
생   성   자 : 강훈성 
생   성   일 : 2023.02.09
비        고 : 외부 사이트 관리 MASTER
*******************************************************************************************
수정 :
2023.02.09 강훈성 : [IT200061-49064] 최초생성
*******************************************************************************************/	
CREATE TABLE [dbo].[TBP_EXTERNAL_URL_MASTER](
	[Code] [int] IDENTITY(1,1) NOT NULL,
	[CompanyCode] [nvarchar](50) NOT NULL,
	[MasterName] [nvarchar](500) NOT NULL,
	[ParentCode] [int] NULL,
	[SortOrder] [int] NOT NULL,
	[UseYN] [char](1) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[SiteUrl] [nvarchar](1000) NULL,
	[CategoryName] [nvarchar](50) NULL,
	[MainAgentName] [nvarchar](50) NULL,
	[ChargeName] [nvarchar](50) NULL,
	[LanguageName] [nvarchar](50) NULL,
	[CreateUserID] [int] NOT NULL,
	[CreateDate] [datetime] NULL,
	[UpdateUserID] [int] NULL,
	[UpdateDate] [datetime] NULL,
 CONSTRAINT [PK_TBP_EXTERNAL_URL_MASTER] PRIMARY KEY CLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBP_EXTERNAL_URL_MASTER] ADD  DEFAULT ('Y') FOR [UseYN]
GO

ALTER TABLE [dbo].[TBP_EXTERNAL_URL_MASTER] ADD  DEFAULT (getdate()) FOR [CreateDate]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드(PK)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'Code'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'회사코드' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CompanyCode'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'MasterName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'부모코드' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'ParentCode'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'순서' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'SortOrder'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'사용여부' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UseYN'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'설명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'Description'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'사이트 주소' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'SiteUrl'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'카테고리명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CategoryName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'주체명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'MainAgentName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'요금명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'ChargeName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'언어명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'LanguageName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'생성자 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CreateUserID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'생성일자' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CreateDate'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'수정자 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UpdateUserID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'수정일자' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UpdateDate'
GO


