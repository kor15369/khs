USE [VCP_CUSTOM01]
GO

/****** Object:  Table [dbo].[TBP_EXTERNAL_URL_ACCESS]    Script Date: 2023-02-06 오후 2:39:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
/******************************************************************************************
테 이 블  명 : TBP_EXTERNAL_URL_ACCESS
생   성   자 : 강훈성 
생   성   일 : 2023.02.09
비        고 : 외부 사이트 관리 ACCESS
*******************************************************************************************
수정 :
2023.02.09 강훈성 : [IT200061-49064] 최초생성
*******************************************************************************************/	
CREATE TABLE [dbo].[TBP_EXTERNAL_URL_ACCESS](
	[Code] [int] NOT NULL,
	[Dept_Id] [varchar](16) NOT NULL,
 CONSTRAINT [PK_TBP_EXTERNAL_URL_ACCESS] PRIMARY KEY CLUSTERED 
(
	[Code] ASC,
	[Dept_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'COLUMN',@level2name=N'Code'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'부서ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'COLUMN',@level2name=N'Dept_Id'
GO


