from fastapi import HTTPException, Request ,FastAPI
from fastapi.responses import JSONResponse
from routers.auth_router import router as auth_router
from routers.todo_router import router as todo_router
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import time
limiter=Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter=limiter
app.add_exception_handler(RateLimitExceeded,_rate_limit_exceeded_handler)\
@app.get("/api/secure-data")
@limiter.limit("3/minute") 
async def secure_endpoint(request: Request):
    return{"message":"This is protected data"}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo_router)
app.include_router(auth_router)


@app.middleware("http")
async def log_requests(request: Request, call_next):

    start_time = time.time()

    print(f"Request: {request.method} {request.url}")

    response = await call_next(request)

    process_time = time.time() - start_time

    print(f"Completed in {process_time:.4f}s")

    return response


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail
        }
    )